
import React, { useState } from 'react';
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";

const AccountActionsCard = () => {
  const [loading, setLoading] = useState(false);
  
  const handleDeactivate = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Votre demande de désactivation a été enregistrée", {
        description: "Un email de confirmation vous a été envoyé."
      });
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="animate-fade-in">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive"
            className="w-full md:w-auto px-8 py-6 text-base transition-all hover:bg-destructive/90"
          >
            Désactiver mon compte
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Désactiver votre compte ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Votre compte sera désactivé et toutes vos données personnelles seront anonymisées conformément à notre politique de confidentialité.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeactivate}
              disabled={loading}
              className={loading ? "opacity-75 pointer-events-none" : ""}
            >
              {loading ? "Traitement en cours..." : "Je confirme la désactivation"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountActionsCard;
