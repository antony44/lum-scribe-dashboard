
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
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
import Plans from "./pages/Plans";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Layout with sidebar for authenticated users
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background dark:bg-background">
      <LumSidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen p-6 bg-background dark:bg-background">
        {children}
      </main>
    </div>
  );
};

// Routes component separated to use auth context
const AppRoutes = () => {
  const { session, user } = useAuth();
  
  // Log authentication state to debug
  useEffect(() => {
    console.log("Auth state:", { isAuthenticated: !!session, user });
  }, [session, user]);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Index />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      {/* Order page is accessible without authentication */}
      <Route path="/order" element={
        <AuthenticatedLayout>
          <Order />
        </AuthenticatedLayout>
      } />
      
      <Route path="/articles" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Articles />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/analytics" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Analytics />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/invoices" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Invoices />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/referral" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Referral />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/account" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Account />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/plans" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Plans />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/support" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Support />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/faq" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <FAQ />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/resources" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Resources />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Settings />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/orders-history" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <OrdersHistoryPage />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={
        <ProtectedRoute>
          <AuthenticatedLayout>
            <NotFound />
          </AuthenticatedLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
