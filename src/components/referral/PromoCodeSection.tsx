
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Plus, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreatePromoCodeModal from "./CreatePromoCodeModal";

interface PromoCodeSectionProps {
  onPromoCreated: () => void;
}

const promoData = [
  { 
    name: 'BIENVENUE10', 
    reduction: '-10%', 
    utilisations: '24', 
    montant: '240€', 
    statut: 'Actif', 
    dateExpiration: '31/12/2025' 
  },
  { 
    name: 'SUMMER25', 
    reduction: '-25%', 
    utilisations: '5', 
    montant: '125€', 
    statut: 'Actif', 
    dateExpiration: '31/08/2025' 
  },
  { 
    name: 'WINTER2024', 
    reduction: '-15%', 
    utilisations: '12', 
    montant: '180€', 
    statut: 'Expiré', 
    dateExpiration: '01/03/2025' 
  },
];

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({ onPromoCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copié !",
      description: "Le code a été copié dans votre presse-papier."
    });
  };

  const deleteCode = (code: string) => {
    toast({
      title: "Code supprimé",
      description: `Le code "${code}" a été supprimé avec succès.`
    });
  };

  const handlePromoCreated = () => {
    setIsModalOpen(false);
    onPromoCreated();
  };

  return (
    <>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h3 className="font-semibold text-lg">Mes codes promo</h3>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Créer un code promo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-2 mb-4">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Créez des codes promo personnalisés pour vos clients ou événements. 
              Les codes peuvent être limités en nombre d'utilisations et dans le temps.
            </p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du code</TableHead>
                <TableHead>Réduction</TableHead>
                <TableHead>Utilisations</TableHead>
                <TableHead>Montant total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.reduction}</TableCell>
                  <TableCell>{item.utilisations}</TableCell>
                  <TableCell>{item.montant}</TableCell>
                  <TableCell>
                    <Badge className={
                      item.statut === 'Actif' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }>
                      {item.statut}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyCode(item.name)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteCode(item.name)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <CreatePromoCodeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={handlePromoCreated} 
      />
    </>
  );
};

export default PromoCodeSection;
