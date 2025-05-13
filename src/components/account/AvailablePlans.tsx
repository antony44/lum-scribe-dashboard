
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface PlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  type: "basic" | "premium" | "pro";
  isPopular?: boolean;
  currentPlan: string | null;
}

const PlanCard: React.FC<PlanProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  type, 
  isPopular = false,
  currentPlan
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const isCurrentPlan = currentPlan?.toLowerCase() === type.toLowerCase();

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour vous abonner");
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: type }
      });
      
      if (error || !data?.url) {
        console.error('Erreur lors de la création de la session de paiement:', error);
        toast.error("Impossible de créer la session de paiement");
        return;
      }
      
      // Redirection vers la page de paiement Stripe
      window.open(data.url, '_blank');
      toast.info('Redirection vers la page de paiement');
    } catch (err) {
      console.error('Erreur inattendue:', err);
      toast.error("Impossible de créer la session de paiement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col h-full ${isPopular ? 'border-blue-500 shadow-lg' : 'border shadow-sm'}`}>
      {isPopular && (
        <div className="bg-blue-500 text-white text-xs font-medium py-1 px-3 rounded-t-md text-center">
          PLUS POPULAIRE
        </div>
      )}
      
      <CardHeader className={isPopular && !isCurrentPlan ? 'pt-4' : ''}>
        {isCurrentPlan && (
          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-medium py-1 px-3 rounded-md mb-2 inline-block">
            PLAN ACTUEL
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-3xl font-bold mb-6">{price} <span className="text-sm font-normal text-muted-foreground">/mois</span></p>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button
          onClick={handleSubscribe}
          className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          variant={isPopular ? "default" : "outline"}
          disabled={isLoading || isCurrentPlan}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement...</>
          ) : isCurrentPlan ? (
            'Plan actuel'
          ) : (
            `Choisir ${title}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const AvailablePlans: React.FC<{ currentPlan: string | null }> = ({ currentPlan }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Plans disponibles</h2>
      <p className="text-muted-foreground">Choisissez le plan qui correspond le mieux à vos besoins.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <PlanCard
          title="Basic"
          price="0€"
          description="Pour commencer avec LÜM"
          type="basic"
          features={[
            "Accès à toutes les fonctionnalités de base",
            "1 article par mois",
            "Support par email"
          ]}
          currentPlan={currentPlan}
        />
        
        <PlanCard
          title="Premium"
          price="19,99€"
          description="Pour les professionnels du contenu"
          type="premium"
          isPopular={true}
          features={[
            "Tout ce qui est inclus dans Basic",
            "10 articles par mois",
            "Optimisation SEO avancée",
            "Support prioritaire"
          ]}
          currentPlan={currentPlan}
        />
        
        <PlanCard
          title="Pro"
          price="49,99€"
          description="Pour les entreprises et agences"
          type="pro"
          features={[
            "Tout ce qui est inclus dans Premium",
            "30 articles par mois",
            "Accès API",
            "Support dédié",
            "Rapports analytiques"
          ]}
          currentPlan={currentPlan}
        />
      </div>
    </div>
  );
};

export default AvailablePlans;
