
import React, { useState } from "react";
import OrdersHistoryFilters from "@/components/OrdersHistoryFilters";
import OrdersHistoryTable from "@/components/OrdersHistoryTable";
import OrdersHistoryTimeline from "@/components/OrdersHistoryTimeline";
import ContextHelpSidebar from "@/components/ContextHelpSidebar";

const OrdersHistoryPage = () => {
  const [view, setView] = useState<"table" | "timeline">("table");

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 flex flex-row w-full py-4">
        <div className="flex-1 flex flex-col max-w-5xl w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Historique des commandes</h1>
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
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
