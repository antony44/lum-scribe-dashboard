
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Exemple de données pour les factures
const invoices = [
  { id: "INV-001", date: "01/04/2025", montant: "249,00 €", statut: "Payée" },
  { id: "INV-002", date: "01/03/2025", montant: "249,00 €", statut: "Payée" },
  { id: "INV-003", date: "01/02/2025", montant: "249,00 €", statut: "Payée" },
  { id: "INV-004", date: "01/01/2025", montant: "149,00 €", statut: "Payée" }
];

const Invoices = () => {
  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Factures</h1>
        <p className="text-muted-foreground">Gérez vos factures et vos paiements.</p>
      </div>
      
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Historique de facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="dark-table">
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-foreground">N° Facture</TableHead>
                <TableHead className="text-foreground">Date</TableHead>
                <TableHead className="text-foreground">Montant</TableHead>
                <TableHead className="text-foreground">Statut</TableHead>
                <TableHead className="text-right text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                  <TableCell className="text-foreground">{invoice.date}</TableCell>
                  <TableCell className="text-foreground">{invoice.montant}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      {invoice.statut}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="dark-button"
                    >
                      <Download className="h-4 w-4 mr-2" /> 
                      Télécharger
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
