import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";
import TopBar from "@/components/TopBar";
import LumSidebar from "@/components/LumSidebar";
import { Shield, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

// Types pour les données des factures et les filtres
type Invoice = {
  id: string;
  date: string;
  number: string;
  description: string;
  amount: string;
};

type FilterValue = string | null;
type Filters = {
  statut: FilterValue;
  periode: FilterValue;
  type: FilterValue;
};

// Données mockées pour les factures
const invoiceData: Invoice[] = [
  {
    id: "1",
    date: "18 avril 2024",
    number: "FCT-2024-018",
    description: "Pack Mensuel",
    amount: "99 €",
  },
  {
    id: "2",
    date: "10 avril 2024",
    number: "FCT-2024-011",
    description: "Article à l'unité",
    amount: "29 €",
  },
  {
    id: "3",
    date: "25 mars 2024",
    number: "FCT-2024-003",
    description: "Pack Annuel",
    amount: "900 €",
  },
];

const Invoices = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    statut: null,
    periode: null,
    type: null,
  });

  // Gestion des téléchargements de factures
  const handleDownload = (invoiceId: string) => {
    setLoading(invoiceId);
    
    // Simuler un chargement
    setTimeout(() => {
      setLoading(null);
      toast.success("Facture téléchargée avec succès");
    }, 1000);
  };

  // Gestion de l'export de toutes les factures
  const handleExportAll = () => {
    setLoading("export-all");
    
    // Simuler un chargement pour l'export
    setTimeout(() => {
      setLoading(null);
      toast.success("Toutes les factures ont été exportées");
    }, 1500);
  };

  // Gestion des filtres
  const handleFilterChange = (filterType: keyof Filters, value: FilterValue) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  return (
    <div className="flex min-h-screen">
      <LumSidebar activeSection="Factures" />
      <div className="flex-1">
        <TopBar />
        
        <main className="container mx-auto p-6">
          <h1 className="text-4xl font-bold mb-6">Factures & Paiement</h1>
          
          {/* Bannière de sécurité */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-center shadow-sm">
            <Shield className="text-blue-600 w-6 h-6 mr-3" />
            <p className="text-sm text-blue-800">
              Paiement 100 % sécurisé via Stripe / Apple Pay. Données chiffrées.
            </p>
          </div>
          
          {/* Section des filtres et exports */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <Button 
              onClick={handleExportAll} 
              variant="outline" 
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50"
              disabled={loading === "export-all"}
            >
              {loading === "export-all" ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FileText className="w-4 h-4" />
              )}
              Tout exporter
            </Button>
            
            <div className="flex flex-wrap gap-3">
              {/* Filtre par Statut */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  className={`flex items-center gap-2 ${filters.statut ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                  onClick={() => handleFilterChange("statut", "payée")}
                >
                  Statut
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M6 8L2 4H10L6 8Z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
              
              {/* Filtre par Période */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  className={`flex items-center gap-2 ${filters.periode ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                  onClick={() => handleFilterChange("periode", "mois")}
                >
                  Période
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M6 8L2 4H10L6 8Z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
              
              {/* Filtre par Type */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  className={`flex items-center gap-2 ${filters.type ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                  onClick={() => handleFilterChange("type", "pack")}
                >
                  Type
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M6 8L2 4H10L6 8Z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tableau des factures */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">N° de facture</TableHead>
                  <TableHead className="font-medium">Libellé</TableHead>
                  <TableHead className="font-medium text-right">Montant</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{invoice.date}</TableCell>
                    <TableCell>{invoice.number}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell className="text-right">{invoice.amount}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium flex items-center gap-1"
                        onClick={() => handleDownload(invoice.id)}
                        disabled={loading === invoice.id}
                      >
                        {loading === invoice.id ? (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                        ) : (
                          <Download className="w-4 h-4 mr-1" />
                        )}
                        Télécharger
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Aide contextuelle en bas de page */}
          <div className="mt-12 text-sm text-center text-gray-500">
            <p>Besoin d'aide avec vos factures ? <a href="#" className="text-blue-600 hover:underline">Consultez notre FAQ</a> ou <a href="#" className="text-blue-600 hover:underline">contactez notre support</a>.</p>
            <p className="mt-2 text-xs">LÜM SaaS • v1.5.2 • <a href="#" className="hover:underline">Mentions légales</a></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Invoices;
