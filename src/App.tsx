
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SidebarProvider
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Articles from "./pages/Articles";
import Analytics from "./pages/Analytics";
import Invoices from "./pages/Invoices";
import Referral from "./pages/Referral";
import Account from "./pages/Account";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <div className="flex min-h-screen w-full">
            {/* Sidebar (desktop) */}
            <div className="hidden md:block">
              <AppSidebar />
            </div>
            {/* Main content */}
            <main className="flex-1 bg-background min-h-screen relative pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/order" element={<Order />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/account" element={<Account />} />
                <Route path="/support" element={<Support />} />
                <Route path="/settings" element={<Settings />} />
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {/* Mobile Bottom Navigation */}
            <BottomNav />
          </div>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

