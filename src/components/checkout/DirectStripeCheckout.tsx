
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DirectStripeCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { user } = useAuth();

  const handleStartCheckout = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour vous abonner",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { cycle: billingCycle }
      });
      
      if (error || !data?.url) {
        console.error('Erreur lors de la création de la session de paiement:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la session de paiement",
          variant: "destructive"
        });
        return;
      }
      
      // Redirection vers la page de paiement Stripe dans un nouvel onglet
      window.open(data.url, '_blank');
      toast({
        title: "Redirection",
        description: "Ouverture de la page de paiement Stripe dans un nouvel onglet"
      });
    } catch (err) {
      console.error('Erreur inattendue:', err);
      toast({
        title: "Erreur",
        description: "Impossible de créer la session de paiement",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Test d'abonnement</CardTitle>
        <CardDescription>
          Testez notre tunnel d'abonnement en utilisant Stripe Checkout
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="billing-cycle" 
            checked={billingCycle === 'yearly'} 
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')} 
          />
          <Label htmlFor="billing-cycle">
            Facturation {billingCycle === 'yearly' ? 'annuelle' : 'mensuelle'}
          </Label>
        </div>
        <div className="text-sm text-muted-foreground">
          {billingCycle === 'yearly' ? 'Économisez 20% avec un abonnement annuel' : 'Facturé mensuellement, annulez à tout moment'}
        </div>
        <Button
          className="w-full"
          onClick={handleStartCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : (
            'Démarrer l\'abonnement avec Stripe'
          )}
        </Button>
        <div className="text-xs text-muted-foreground text-center pt-2">
          Mode test - Utilisez la carte 4242 4242 4242 4242
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectStripeCheckout;
