
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";

const AccountProfileCard = () => {
  const handleEdit = () => {
    toast.info("Fonctionnalité de modification en développement");
  };
  
  return (
    <Card className="border shadow-sm animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <span className="text-xs text-white font-medium">Changer</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">john.doe@example.com</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 px-3 py-1 w-fit">
                Pro
              </Badge>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p>John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adresse e-mail</p>
                  <p>john.doe@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entreprise</p>
                  <p>Exemple S.A.S.</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SIRET</p>
                  <p>000 000 000 000 0000</p>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleEdit}
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto bg-transparent hover:bg-transparent border-none shadow-none hover:underline"
                >
                  Changer le mot de passe
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={handleEdit}
            >
              Modifier
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountProfileCard;
