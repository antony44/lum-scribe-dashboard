
import React from "react";
import OrderForm from "@/components/OrderForm";

const Order = () => (
  <div className="h-full min-h-screen w-full bg-[#F6F8FA] font-inter flex flex-col items-stretch">
    <div className="w-full max-w-4xl mx-auto py-10 px-2 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
        Commander un article
      </h1>
      <div className="h-1 w-28 bg-blue-600 rounded-full mb-8" />
      <OrderForm />
      {/* Visual ref: ChatGPT Image 25 avr. 2025, 21_05_58.png */}
    </div>
  </div>
);

export default Order;
