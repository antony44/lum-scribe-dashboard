
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

export function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
    } else {
      toast.success("Déconnexion réussie");
      navigate("/auth");
    }
  };

  // Get initials from email or use default
  const getInitials = () => {
    if (!user || !user.email) return "Ü";
    return user.email.substring(0, 2).toUpperCase();
  };

  // Get name from email or use default
  const getName = () => {
    if (!user || !user.email) return "Utilisateur";
    return user.email.split("@")[0];
  };

  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-sidebar-border">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12 border-2 border-sidebar-border">
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{getName()}</p>
          <p className="text-sm opacity-70">Premium</p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        title="Se déconnecter"
        className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
