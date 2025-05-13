
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/components/AuthProvider";
import PricingPlans from "@/components/pricing/PricingPlans";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Plans = () => {
  const { user } = useAuth();

  // Récupérer le plan actuel de l'utilisateur
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        toast.error(`Erreur lors de la vérification de l'abonnement: ${error.message}`);
        throw error;
      }
      return data;
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Plans et Tarifs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choisissez le plan qui correspond à vos besoins et commencez à créer des articles optimisés pour le SEO dès aujourd'hui
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingPlans currentPlan={subscription?.subscription_tier} isLoading={isLoading} />
      </div>

      {/* Testimonial */}
      <div className="max-w-5xl mx-auto mt-20 px-4">
        <div className="bg-primary/5 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
              <AspectRatio ratio={1/1}>
                <img 
                  src="https://randomuser.me/api/portraits/men/43.jpg" 
                  alt="Témoignage client" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            <div className="flex-1">
              <p className="text-lg italic text-muted-foreground mb-4">
                "Grâce à LÜM, j'ai pu augmenter le trafic organique de mon site de 65% en seulement 3 mois. 
                La qualité des articles est vraiment exceptionnelle et le processus est incroyablement simple."
              </p>
              <p className="font-semibold">Thomas Dubois</p>
              <p className="text-sm text-muted-foreground">Fondateur, AgenceDigitale.fr</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Questions fréquentes</h2>
        <PricingFAQ />
      </div>
    </div>
  );
};

export default Plans;
