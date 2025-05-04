
import React from 'react';
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

export function AuthHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex items-center gap-2">
          <span className="text-sm hidden md:inline">
            {user.email}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/account')}
          >
            Mon compte
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/auth')}
          >
            Se connecter
          </Button>
        </div>
      )}
    </div>
  );
}
