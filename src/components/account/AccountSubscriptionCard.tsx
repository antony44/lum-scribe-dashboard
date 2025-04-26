
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const AccountSubscriptionCard = () => {
  const handleManageSubscription = () => {
    toast.info("Redirection vers la page de gestion d'abonnement");
  };

  return (
    <Card className="border shadow-sm h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Abonnement & plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-semibold">Pro Mensuel</p>
          </div>
          
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Renouvellement</p>
            <p className="font-semibold">14 juin 2025</p>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleManageSubscription}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Gérer mon abonnement
            </Button>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Historique des changements</p>
          <ul className="space-y-2">
            <li className="text-sm">
              <span className="text-muted-foreground mr-2">—</span>
              Passage à Pro : 10 mars 2025
            </li>
            <li className="text-sm">
              <span className="text-muted-foreground mr-2">—</span>
              Passage à Essai : 10 fév 2025
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSubscriptionCard;
