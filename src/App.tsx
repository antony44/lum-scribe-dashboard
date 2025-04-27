import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import LumSidebar from "@/components/LumSidebar";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Articles from "./pages/Articles";
import Analytics from "./pages/Analytics";
import Invoices from "./pages/Invoices";
import Referral from "./pages/Referral";
import Account from "./pages/Account";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import OrdersHistoryPage from "./pages/OrdersHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <div className="flex min-h-screen w-full bg-background dark:bg-background">
            <LumSidebar />
            <main className="flex-1 ml-0 md:ml-64 min-h-screen p-6 bg-background dark:bg-background">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Index />} />
                <Route path="/order" element={<Order />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/account" element={<Account />} />
                <Route path="/support" element={<Support />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/orders-history" element={<OrdersHistoryPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
