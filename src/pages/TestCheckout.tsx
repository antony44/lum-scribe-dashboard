
import React from 'react';
import DirectStripeCheckout from '@/components/checkout/DirectStripeCheckout';

const TestCheckout = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Test du Tunnel de Vente</h1>
      <DirectStripeCheckout />
    </div>
  );
};

export default TestCheckout;
