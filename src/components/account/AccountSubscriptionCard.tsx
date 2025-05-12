
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { format, isPast, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const AccountSubscriptionCard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [subscription, setSubscription] = useState<{
    subscribed: boolean;
    subscription_tier: string | null;
    subscription_end: string | null;
    error?: string;
  } | null>(null);

  const checkSubscription = async () => {
    if (!user) return;
    
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Erreur lors de la vérification de l\'abonnement:', error);
        toast.error('Impossible de vérifier l\'abonnement');
        return;
      }
      
      setSubscription(data);
      console.log('Données d\'abonnement:', data);
    } catch (err) {
      console.error('Erreur inattendue:', err);
      toast.error('Impossible de vérifier l\'abonnement');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const handleManageSubscription = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour gérer votre abonnement');
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error || !data?.url) {
        console.error('Erreur lors de la création de la session du portail client:', error);
        toast.error('Impossible d\'accéder au portail d\'abonnement');
        return;
      }
      
      // Redirection vers le portail client Stripe
      window.open(data.url, '_blank');
      toast.info('Redirection vers le portail de gestion d\'abonnement');
    } catch (err) {
      console.error('Erreur inattendue:', err);
      toast.error('Impossible d\'accéder au portail d\'abonnement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCheckout = async (plan: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour vous abonner');
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan }
      });
      
      if (error || !data?.url) {
        console.error('Erreur lors de la création de la session de paiement:', error);
        toast.error('Impossible de créer la session de paiement');
        return;
      }
      
      // Redirection vers la page de paiement Stripe
      window.open(data.url, '_blank');
      toast.info('Redirection vers la page de paiement');
    } catch (err) {
      console.error('Erreur inattendue:', err);
      toast.error('Impossible de créer la session de paiement');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = parseISO(dateString);
      return format(date, 'd MMMM yyyy', { locale: fr });
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };

  // Fonction pour formater le nom du plan
  const formatPlanName = (plan: string | null) => {
    if (!plan) return 'Basic';
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  // Si l'abonnement a expiré, on considère que l'utilisateur est sur le plan Basic
  const getCurrentPlan = () => {
    if (!subscription) return 'Basic';
    if (!subscription.subscribed) return 'Basic';
    if (!subscription.subscription_end) return formatPlanName(subscription.subscription_tier);
    
    const endDate = parseISO(subscription.subscription_end);
    return isPast(endDate) ? 'Basic' : formatPlanName(subscription.subscription_tier);
  };

  const currentPlan = getCurrentPlan();
  const renewalDate = subscription?.subscription_end ? formatDate(subscription.subscription_end) : 'Aucun';

  return (
    <Card className="border shadow-sm h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Abonnement & plan</span>
          {isChecking && <Loader2 className="animate-spin h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {subscription?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {subscription.error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-semibold">{currentPlan}</p>
          </div>
          
          {subscription?.subscribed && (
            <div className="flex justify-between items-start">
              <p className="text-sm text-muted-foreground">Renouvellement</p>
              <p className="font-semibold">{renewalDate}</p>
            </div>
          )}
          
          <div className="pt-2 space-y-2">
            {subscription?.subscribed ? (
              <Button 
                onClick={handleManageSubscription}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement...</>
                ) : (
                  'Gérer mon abonnement'
                )}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  onClick={() => handleCreateCheckout('premium')}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement...</>
                  ) : (
                    'S\'abonner au plan Premium'
                  )}
                </Button>
                
                <Button 
                  onClick={() => handleCreateCheckout('pro')}
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement...</>
                  ) : (
                    'S\'abonner au plan Pro'
                  )}
                </Button>
              </div>
            )}
            
            <Button 
              onClick={checkSubscription} 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              disabled={isChecking}
            >
              {isChecking ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Vérification...</>
              ) : (
                'Actualiser le statut d\'abonnement'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSubscriptionCard;
