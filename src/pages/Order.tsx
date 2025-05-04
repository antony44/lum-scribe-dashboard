
import React from 'react';
import OrderForm from '@/components/OrderForm';

const Order = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Commander un article</h1>
      <OrderForm />
    </div>
  );
};

export default Order;
