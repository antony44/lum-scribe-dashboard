
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PlanProps {
  id: string;
  title: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  mostPopular?: boolean;
  isBasic?: boolean;
  currentPlan?: string | null;
}

const plans: PlanProps[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Pour commencer avec LÜM",
    monthlyPrice: 0,
    yearlyPrice: 0,
    isBasic: true,
    features: [
      { text: "1 article par mois", included: true },
      { text: "Optimisation SEO de base", included: true },
      { text: "Support par email", included: true },
      { text: "Accès à la plateforme LÜM", included: true },
      { text: "Optimisation SEO avancée", included: false },
      { text: "Intégration automatique à WordPress", included: false },
      { text: "Support prioritaire", included: false },
    ]
  },
  {
    id: "premium",
    title: "Premium",
    description: "Pour les professionnels du contenu",
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    mostPopular: true,
    features: [
      { text: "10 articles par mois", included: true },
      { text: "Optimisation SEO avancée", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Accès à la plateforme LÜM", included: true },
      { text: "Intégration automatique à WordPress", included: true },
      { text: "Rapport d'analyse mensuel", included: true },
      { text: "Rapport analytiques avancés", included: false },
    ]
  },
  {
    id: "pro",
    title: "Pro",
    description: "Pour les entreprises et agences",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    features: [
      { text: "30 articles par mois", included: true },
      { text: "Optimisation SEO avancée", included: true },
      { text: "Support dédié", included: true },
      { text: "Accès à la plateforme LÜM", included: true },
      { text: "Intégration automatique à WordPress", included: true },
      { text: "Rapport d'analyse hebdomadaire", included: true },
      { text: "Rapport analytiques avancés", included: true },
    ]
  }
];

interface PricingPlansProps {
  currentPlan?: string | null;
  isLoading?: boolean;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ currentPlan, isLoading }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour vous abonner");
      return;
    }
    
    setLoadingPlan(planId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan: planId,
          cycle: billingCycle
        }
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
      setLoadingPlan(null);
    }
  };
  
  const isCurrentPlan = (planId: string): boolean => {
    return currentPlan?.toLowerCase() === planId.toLowerCase();
  };

  const getYearlySavingsPercentage = (monthlyPrice: number, yearlyPrice: number): number => {
    if (monthlyPrice === 0) return 0;
    const monthlyCostForYear = monthlyPrice * 12;
    const savings = monthlyCostForYear - yearlyPrice;
    return Math.round((savings / monthlyCostForYear) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Toggle for billing cycle */}
      <div className="flex justify-center items-center mb-10 gap-4">
        <span className={cn("text-sm font-medium", billingCycle === 'monthly' && "text-primary")}>Mensuel</span>
        <Toggle 
          pressed={billingCycle === 'yearly'} 
          onPressedChange={(pressed) => setBillingCycle(pressed ? 'yearly' : 'monthly')}
          className="data-[state=on]:bg-primary"
        />
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", billingCycle === 'yearly' && "text-primary")}>Annuel</span>
          {billingCycle === 'yearly' && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
              Économisez 20%
            </span>
          )}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          const savingsPercent = getYearlySavingsPercentage(plan.monthlyPrice, plan.yearlyPrice);
          const isPlanActive = isCurrentPlan(plan.id);
          
          return (
            <Card key={plan.id} className={cn(
              "flex flex-col h-full", 
              plan.mostPopular ? "border-primary shadow-md" : "border",
              isPlanActive && "ring-2 ring-primary"
            )}>
              {plan.mostPopular && (
                <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-t-md text-center">
                  PLUS POPULAIRE
                </div>
              )}
              
              <CardHeader className={plan.mostPopular ? "pt-4" : ""}>
                {isPlanActive && (
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-medium py-1 px-3 rounded-md mb-2 inline-block">
                    PLAN ACTUEL
                  </div>
                )}
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow space-y-6">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{price === 0 ? "Gratuit" : `${price.toFixed(2)}€`}</span>
                    {price > 0 && <span className="text-sm text-muted-foreground ml-1">{billingCycle === 'monthly' ? '/mois' : '/an'}</span>}
                  </div>
                  
                  {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {`Économisez ${savingsPercent}% par rapport au paiement mensuel`}
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className={cn(
                        "h-5 w-5 flex-shrink-0 mt-0.5", 
                        feature.included ? "text-green-500" : "text-muted-foreground opacity-30"
                      )} />
                      <span className={cn(
                        "text-sm", 
                        !feature.included && "text-muted-foreground line-through opacity-70"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className={cn(
                    "w-full", 
                    plan.mostPopular ? "bg-primary hover:bg-primary/90" : "",
                    plan.isBasic ? "bg-muted text-muted-foreground hover:bg-muted/80" : ""
                  )}
                  variant={plan.isBasic ? "outline" : plan.mostPopular ? "default" : "outline"}
                  disabled={loadingPlan === plan.id || isLoading || isPlanActive}
                >
                  {loadingPlan === plan.id ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement...</>
                  ) : isPlanActive ? (
                    'Plan actuel'
                  ) : plan.isBasic ? (
                    'Plan gratuit'
                  ) : (
                    `Choisir ${plan.title}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;
