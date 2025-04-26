
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

const Account = () => {
  return (
    <div className="container mx-auto py-6">
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
          <AccountInvoicesCard />
        </div>
        
        <div className="col-span-1 md:col-span-7">
          <AccountActionsCard />
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <a href="#" className="text-blue-600 hover:underline text-sm">
          Contact support / FAQ
        </a>
      </div>
    </div>
  );
};

export default Account;
