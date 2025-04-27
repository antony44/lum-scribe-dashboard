import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useQuery } from "@tanstack/react-query";

export function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: profile } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
    } else {
      toast.success("Déconnexion réussie");
      navigate("/auth");
    }
  };

  const getInitials = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'Ü';
  };

  const getName = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    return firstName || lastName 
      ? `${firstName} ${lastName}`.trim()
      : 'Utilisateur';
  };

  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-sidebar-border">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12 border-2 border-sidebar-border">
          <AvatarImage 
            src={profile?.avatar_url} 
            alt={getName()}
          />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{getName()}</p>
          <p className="text-sm opacity-70">
            {profile?.current_plan || 'Basic'}
          </p>
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
