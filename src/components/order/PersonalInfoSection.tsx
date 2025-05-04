
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { OrderFormData } from '@/hooks/useOrderForm';

interface PersonalInfoSectionProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  isUserLoggedIn: boolean;
}

export const PersonalInfoSection = ({ 
  formData, 
  onChange, 
  isUserLoggedIn 
}: PersonalInfoSectionProps) => {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input 
            id="prenom" 
            value={formData.prenom} 
            onChange={(e) => onChange({ prenom: e.target.value })} 
            required 
            readOnly={isUserLoggedIn}
            className={isUserLoggedIn ? "bg-gray-100" : ""}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input 
            id="nom" 
            value={formData.nom} 
            onChange={(e) => onChange({ nom: e.target.value })} 
            required 
            readOnly={isUserLoggedIn}
            className={isUserLoggedIn ? "bg-gray-100" : ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={(e) => onChange({ email: e.target.value })} 
            required 
            readOnly={isUserLoggedIn}
            className={isUserLoggedIn ? "bg-gray-100" : ""}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="entreprise">Entreprise</Label>
          <Input 
            id="entreprise" 
            value={formData.entreprise} 
            onChange={(e) => onChange({ entreprise: e.target.value })} 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="site_web">Site web</Label>
        <Input 
          id="site_web" 
          type="url" 
          value={formData.site_web} 
          onChange={(e) => onChange({ site_web: e.target.value })}
          placeholder="https://votresite.com" 
        />
      </div>
    </>
  );
};
