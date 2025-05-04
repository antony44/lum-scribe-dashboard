
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderFormData } from '@/hooks/useOrderForm';

interface ContentDetailsSectionProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
}

export const ContentDetailsSection = ({ 
  formData, 
  onChange 
}: ContentDetailsSectionProps) => {

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="categorie">Catégorie d'article</Label>
        <Select 
          value={formData.categorie} 
          onValueChange={(value) => onChange({ categorie: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="actualite">Actualité</SelectItem>
            <SelectItem value="tutoriel">Tutoriel</SelectItem>
            <SelectItem value="etude_cas">Étude de cas</SelectItem>
            <SelectItem value="guide">Guide</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sujet">Sujet</Label>
        <Input 
          id="sujet" 
          value={formData.sujet} 
          onChange={(e) => onChange({ sujet: e.target.value })} 
          required 
          placeholder="Sujet principal de l'article" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contexte">Contexte</Label>
        <Textarea 
          id="contexte" 
          value={formData.contexte} 
          onChange={(e) => onChange({ contexte: e.target.value })} 
          placeholder="Fournissez le contexte pour cet article" 
          rows={4} 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objectif">Objectif</Label>
        <Textarea 
          id="objectif" 
          value={formData.objectif} 
          onChange={(e) => onChange({ objectif: e.target.value })} 
          placeholder="Quel est l'objectif de cet article?" 
          rows={4} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ton">Ton et style</Label>
        <Select 
          value={formData.ton} 
          onValueChange={(value) => onChange({ ton: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un ton" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formel">Formel</SelectItem>
            <SelectItem value="professionnel">Professionnel</SelectItem>
            <SelectItem value="conversationnel">Conversationnel</SelectItem>
            <SelectItem value="amical">Amical</SelectItem>
            <SelectItem value="humoristique">Humoristique</SelectItem>
            <SelectItem value="autoritaire">Autoritaire</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
