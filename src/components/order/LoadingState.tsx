
import React from 'react';
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="container mx-auto py-6 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Chargement de vos informations...</p>
      </div>
    </div>
  );
};
