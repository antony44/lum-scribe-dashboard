
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const ReferralStats = () => {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
          Statistiques
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Filleuls actifs</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Gains cumulés</p>
            <p className="text-2xl font-bold">42 €</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Dernière transaction</p>
            <p className="font-medium">12 € <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">payé</span></p>
            <p className="text-xs text-muted-foreground">24 avr. 2025</p>
          </div>

          <div className="pt-2">
            <p className="text-center">
              <a href="#" className="text-blue-600 hover:underline text-sm">Classement des parrains</a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralStats;
