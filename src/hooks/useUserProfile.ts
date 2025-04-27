
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { User } from '@supabase/supabase-js';

export const useUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (
    user: User, 
    profileData: {
      first_name?: string;
      last_name?: string;
      email?: string;
      avatar_url?: string;
    }
  ) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) throw error;

      // Update email in auth if changed
      if (profileData.email && profileData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: profileData.email
        });
        if (emailError) throw emailError;
      }

      toast.success('Profil mis à jour avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast.error('Impossible de mettre à jour le profil');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading };
};
