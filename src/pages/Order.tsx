
import React from "react";
import OrderForm from "@/components/OrderForm";
import ContextHelpSidebar from "@/components/ContextHelpSidebar";

// Add a prop to determine if user is an admin - in a real app this would come from auth context
// For now we'll set a default to false
const Order = ({ isAdmin = false }) => (
  <div className="h-full min-h-screen w-full bg-background dark:bg-[#161C24] font-inter flex flex-col items-stretch">
    <div className="w-full max-w-5xl mx-auto py-10 px-2 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
        Créer un Article
      </h1>
      <div className="h-1 w-28 bg-[#0061E0] rounded-full mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <OrderForm showWebhookSettings={isAdmin} />
        </div>
        <div className="col-span-1 order-first md:order-last mb-6 md:mb-0">
          <ContextHelpSidebar className="sticky top-6" />
        </div>
      </div>
    </div>
  </div>
);

export default Order;
