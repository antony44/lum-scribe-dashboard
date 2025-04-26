
import React from "react";
import OrderForm from "@/components/OrderForm";
import ContextHelpSidebar from "@/components/ContextHelpSidebar";

const Order = () => (
  <div className="h-full min-h-screen w-full bg-background dark:bg-[#161C24] font-inter flex flex-col items-stretch">
    <div className="w-full max-w-7xl mx-auto py-10 px-2 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
        Commander un article
      </h1>
      <div className="h-1 w-28 bg-[#0061E0] rounded-full mb-8" />
      
      {/* Layout principal : formulaire à gauche, aide à droite */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 max-w-[780px]">
          <OrderForm />
        </div>
        <div className="w-full lg:w-auto">
          <div className="lg:sticky lg:top-10">
            <ContextHelpSidebar className="dark:bg-[#161C24] dark:border-[#202837] dark:hover:bg-[#202837]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Order;
