
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreatePromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreatePromoCodeModal: React.FC<CreatePromoCodeModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [codeData, setCodeData] = useState({
    name: '',
    type: 'percent',
    value: '',
    usageLimit: '',
    expirationDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCodeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally save the data to a backend
    onCreated();
  };

  const generateRandomCode = () => {
    const prefixes = ['SUMMER', 'WELCOME', 'SPECIAL', 'PROMO', 'DEAL'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    setCodeData(prev => ({ ...prev, name: `${randomPrefix}${randomNumber}` }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau code promo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du code</Label>
            <div className="flex gap-2">
              <Input 
                id="name" 
                name="name"
                value={codeData.name} 
                onChange={handleChange}
                placeholder="ex: BIENVENUE10"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={generateRandomCode}
              >
                Générer
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type de réduction</Label>
              <Select 
                value={codeData.type}
                onValueChange={(value) => setCodeData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Pourcentage (%)</SelectItem>
                  <SelectItem value="fixed">Montant fixe (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="value">Valeur</Label>
              <div className="flex">
                <Input 
                  id="value" 
                  name="value"
                  value={codeData.value} 
                  onChange={handleChange}
                  placeholder={codeData.type === 'percent' ? "10" : "20"}
                  type="number"
                />
                <div className="flex items-center justify-center px-3 bg-gray-100 border border-l-0 rounded-r-md">
                  {codeData.type === 'percent' ? '%' : '€'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usageLimit">Limite d'utilisations</Label>
              <Input 
                id="usageLimit" 
                name="usageLimit"
                value={codeData.usageLimit} 
                onChange={handleChange}
                placeholder="Illimité"
                type="number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Date d'expiration</Label>
              <Input 
                id="expirationDate" 
                name="expirationDate"
                value={codeData.expirationDate} 
                onChange={handleChange}
                type="date"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="ml-2">
              Créer le code
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromoCodeModal;
