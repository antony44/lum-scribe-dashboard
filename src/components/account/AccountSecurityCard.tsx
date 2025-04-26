
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const AccountSecurityCard = () => {
  return (
    <Card className="border shadow-sm h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Sécurité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p className="font-medium">Authentification à deux facteurs</p>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Activée
          </Badge>
        </div>

        <div>
          <p className="font-medium text-sm mb-2">Dernières connexions</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm">
              <span className="h-2 w-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Connexion réussie</p>
                <p className="text-muted-foreground">Il y a 2 heures</p>
              </div>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Changement de mot de passe</p>
                <p className="text-muted-foreground">Il y a 1 jour</p>
              </div>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="h-2 w-2 mt-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Connexion échouée</p>
                <p className="text-muted-foreground">Il y a 3 jours</p>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSecurityCard;
