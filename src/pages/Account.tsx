
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, AlertTriangle } from "lucide-react";
import AccountProfileCard from "@/components/account/AccountProfileCard";
import AccountSecurityCard from "@/components/account/AccountSecurityCard";
import AccountSubscriptionCard from "@/components/account/AccountSubscriptionCard";
import AccountInvoicesCard from "@/components/account/AccountInvoicesCard";
import AccountActionsCard from "@/components/account/AccountActionsCard";
import AvailablePlans from "@/components/account/AvailablePlans";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useSearchParams } from "react-router-dom";

const Account = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const checkoutSuccess = searchParams.get('checkout_success');
  const checkoutCancelled = searchParams.get('checkout_cancelled');

  const { data: subscription } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      return data;
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  // Afficher un toast si l'utilisateur revient après un checkout
  React.useEffect(() => {
    if (checkoutSuccess === 'true') {
      toast.success("Abonnement souscrit avec succès");
    } else if (checkoutCancelled === 'true') {
      toast.info("Processus d'abonnement annulé");
    }
  }, [checkoutSuccess, checkoutCancelled]);

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Mon compte</h1>
        <p className="text-muted-foreground">Gérez vos informations personnelles et vos préférences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="col-span-1 md:col-span-7">
          <AccountProfileCard />
        </div>
        
        <div className="col-span-1 md:col-span-4">
          <AccountSecurityCard />
        </div>
        
        <div className="col-span-1 md:col-span-3">
          <AccountSubscriptionCard />
        </div>
        
        <div className="col-span-1 md:col-span-7">
          <AvailablePlans currentPlan={subscription?.subscription_tier} />
        </div>
        
        <div className="col-span-1 md:col-span-7">
          <AccountInvoicesCard />
        </div>
        
        <div className="col-span-1 md:col-span-7">
          <AccountActionsCard />
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
          Contact support / FAQ
        </a>
      </div>
    </div>
  );
};

export default Account;
