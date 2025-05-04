
import React from 'react';
import { useAuth } from "@/components/AuthProvider";
import { useOrderForm } from '@/hooks/useOrderForm';
import { OrderForm } from '@/components/order/OrderForm';
import { LoadingState } from '@/components/order/LoadingState';

const Order = () => {
  const { user } = useAuth();
  const {
    formData,
    setFormData,
    isLoading,
    isSubmitting,
    handleSubmit
  } = useOrderForm(user);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Commander un article</h1>
      
      <OrderForm 
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isUserLoggedIn={!!user}
      />
    </div>
  );
};

export default Order;
