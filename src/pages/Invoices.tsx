
import React from 'react';

const Invoices = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Factures</h1>
        <p className="text-muted-foreground">Gérez vos factures et vos paiements.</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Historique de facturation</h2>
        <p className="text-muted-foreground">Vos factures apparaîtront ici.</p>
      </div>
    </div>
  );
};

export default Invoices;
