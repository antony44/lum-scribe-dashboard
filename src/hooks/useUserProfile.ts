
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
      current_plan?: string;
    }
  ) => {
    setIsLoading(true);
    try {
      // First check if the user has a profile in the clients table
      const { data: existingProfile } = await supabase
        .from('clients')
        .select('*')
        .eq('id_clients', user.id)
        .single();

      let result;
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('clients')
          .update({
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            email: profileData.email || user.email,
            avatar_url: profileData.avatar_url,
            current_plan: profileData.current_plan
          })
          .eq('id_clients', user.id);
      } else {
        // Create new profile
        result = await supabase
          .from('clients')
          .insert([{
            id_clients: user.id,
            email: profileData.email || user.email,
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            avatar_url: profileData.avatar_url || null,
            current_plan: profileData.current_plan || 'Basic',
            // We need a plans_id, so for now we'll use a default value
            plans_id: '00000000-0000-0000-0000-000000000000'
          }]);
      }

      if (result.error) throw result.error;

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

  const uploadAvatar = async (user: User, file: File): Promise<string | null> => {
    try {
      // First, ensure the storage bucket exists
      const bucketExists = await checkBucketExists('avatars');
      if (!bucketExists) {
        // Create the avatars bucket if it doesn't exist
        const { error: createBucketError } = await supabase.storage.createBucket('avatars', {
          public: true
        });
        
        if (createBucketError) {
          console.error("Error creating 'avatars' bucket:", createBucketError);
          toast.error("Impossible de configurer le stockage");
          return null;
        }
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update the avatar_url in the Clients table
      await updateProfile(user, { avatar_url: publicUrl });
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error("Impossible de télécharger l'avatar");
      return null;
    }
  };

  // Helper to check if a storage bucket exists
  const checkBucketExists = async (bucketName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.storage.getBucket(bucketName);
      if (error) return false;
      return !!data;
    } catch (_) {
      return false;
    }
  };

  return { updateProfile, uploadAvatar, isLoading };
};
