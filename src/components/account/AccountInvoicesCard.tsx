
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

const invoices = [
  {
    date: '21/04/25',
    type: 'Facture',
    amount: '39 €',
    status: 'Payée',
    statusColor: 'green'
  },
  {
    date: '10/03/25',
    type: 'Article',
    amount: '39 €',
    status: 'Livré',
    statusColor: 'blue'
  },
  {
    date: '02/03/25',
    type: 'Facture #000',
    amount: '29 €',
    status: 'En attente',
    statusColor: 'orange'
  }
];

const AccountInvoicesCard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payée':
        return "bg-green-100 text-green-800 border-green-300";
      case 'Livré':
        return "bg-blue-100 text-blue-800 border-blue-300";
      case 'En attente':
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleSeeAll = () => {
    toast.info("Redirection vers l'historique des factures/commandes");
  };

  return (
    <Card className="border shadow-sm animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Historique factures / commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead className="text-right">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.type}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 text-center">
          <button 
            onClick={handleSeeAll}
            className="text-blue-600 hover:underline text-sm"
          >
            Voir toutes mes factures/commandes
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInvoicesCard;
