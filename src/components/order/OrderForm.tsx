
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PersonalInfoSection } from './PersonalInfoSection';
import { ContentDetailsSection } from './ContentDetailsSection';
import { OrderFormData } from '@/hooks/useOrderForm';

interface OrderFormProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  isUserLoggedIn: boolean;
}

export const OrderForm = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  isUserLoggedIn
}: OrderFormProps) => {

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle commande</CardTitle>
        <CardDescription>Remplissez le formulaire ci-dessous pour commander un nouvel article.</CardDescription>
      </CardHeader>
      
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          <PersonalInfoSection 
            formData={formData}
            onChange={onChange}
            isUserLoggedIn={isUserLoggedIn}
          />
          
          <ContentDetailsSection 
            formData={formData}
            onChange={onChange}
          />
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !isUserLoggedIn}
          >
            {isSubmitting ? "Envoi en cours..." : "Commander l'article"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
