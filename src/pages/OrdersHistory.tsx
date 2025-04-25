
import React, { useState } from "react";
import DarkSidebarLUM from "@/components/DarkSidebarLUM";
import OrdersHistoryHeader from "@/components/OrdersHistoryHeader";
import OrdersHistoryFilters from "@/components/OrdersHistoryFilters";
import OrdersHistoryTable from "@/components/OrdersHistoryTable";
import OrdersHistoryTimeline from "@/components/OrdersHistoryTimeline";
import ContextHelpSidebar from "@/components/ContextHelpSidebar";

const OrdersHistoryPage = () => {
  const [view, setView] = useState<"table" | "timeline">("table");

  return (
    <div className="flex min-h-screen bg-[#F6F8FA] font-inter">
      <DarkSidebarLUM activeSection="Commandes" />
      <div className="flex-1 flex flex-col">
        <OrdersHistoryHeader />
        <main className="flex-1 flex flex-row w-full px-0 md:px-8 py-4">
          <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Historique des commandes</h1>
            <OrdersHistoryFilters view={view} setView={setView} />
            <div className="mt-2 transition-all duration-300">
              {view === "table" ? (
                <OrdersHistoryTable />
              ) : (
                <OrdersHistoryTimeline />
              )}
            </div>
          </div>
          <ContextHelpSidebar className="hidden lg:block ml-8" />
        </main>
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
