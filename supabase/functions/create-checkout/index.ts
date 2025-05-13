
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");
    
    // Create Supabase client using the service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });
    
    // Parse request body for plan selection and billing cycle
    const requestBody = await req.json();
    const { plan = "premium", cycle = "monthly" } = requestBody;
    logStep("Request parameters", { plan, cycle });
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if user already has a Stripe customer ID
    const { data: clientData, error: clientError } = await supabaseClient
      .from("clients")
      .select("stripe_customer_id")
      .eq("id_clients", user.id)
      .single();
    
    let customerId;
    
    if (clientData?.stripe_customer_id) {
      customerId = clientData.stripe_customer_id;
      logStep("Found existing Stripe customer ID", { customerId });
    } else {
      // Create or fetch a customer
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found Stripe customer by email", { customerId });
      } else {
        const newCustomer = await stripe.customers.create({
          email: user.email,
          name: `${user.id} - ${user.email}`,
          metadata: { user_id: user.id }
        });
        customerId = newCustomer.id;
        logStep("Created new Stripe customer", { customerId });
      }
      
      // Update the user record with their Stripe customer ID
      await supabaseClient.from("clients").update({
        stripe_customer_id: customerId
      }).eq("id_clients", user.id);
      logStep("Updated Supabase with Stripe customer ID");
    }
    
    // Utiliser l'ID du produit spécifié et récupérer les prix associés
    const productId = "prod_SIwLDKuvnswRD0"; // L'ID de produit fourni par l'utilisateur
    
    // Récupérer tous les prix associés à ce produit
    const pricesList = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 10
    });
    
    if (pricesList.data.length === 0) {
      throw new Error(`No active prices found for product ${productId}`);
    }
    
    logStep("Retrieved prices for product", { 
      productId,
      pricesCount: pricesList.data.length,
      prices: pricesList.data.map(p => ({
        id: p.id,
        amount: p.unit_amount,
        currency: p.currency,
        recurring: p.recurring ? p.recurring.interval : null
      }))
    });
    
    // Sélectionner le prix approprié en fonction du cycle
    let selectedPrice;
    
    // Rechercher un prix correspondant au cycle demandé
    if (cycle === "yearly") {
      selectedPrice = pricesList.data.find(p => p.recurring && p.recurring.interval === "year");
    } else {
      selectedPrice = pricesList.data.find(p => p.recurring && p.recurring.interval === "month");
    }
    
    // Si aucun prix correspondant n'est trouvé, prendre le premier prix disponible
    if (!selectedPrice) {
      selectedPrice = pricesList.data[0];
      logStep("No price found for requested cycle, using fallback price", {
        cycle,
        selectedPriceId: selectedPrice.id,
        interval: selectedPrice.recurring ? selectedPrice.recurring.interval : "one-time"
      });
    } else {
      logStep("Selected price", {
        priceId: selectedPrice.id,
        amount: selectedPrice.unit_amount,
        interval: selectedPrice.recurring ? selectedPrice.recurring.interval : "one-time"
      });
    }
    
    const origin = req.headers.get("Origin") || "https://tqchxcrrzixqeywsbmfg.supabase.co";
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: selectedPrice.id,
          quantity: 1,
        },
      ],
      mode: selectedPrice.recurring ? "subscription" : "payment",
      success_url: `${origin}/account?checkout_success=true`,
      cancel_url: `${origin}/account?checkout_cancelled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_update: {
        address: "auto"
      },
      payment_method_types: ["card"],
      metadata: {
        plan_type: plan,
        billing_cycle: cycle
      }
    });
    
    logStep("Created checkout session", { sessionId: session.id, url: session.url });
    
    // Return the session URL
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`ERROR in create-checkout: ${errorMessage}`);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
