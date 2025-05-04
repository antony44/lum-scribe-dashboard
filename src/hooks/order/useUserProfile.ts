
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ClientData } from './types';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('id_clients', userId)
        .single();
      
      if (error) {
        console.error('Erreur lors de la récupération du profil:', error);
      } else if (data) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du profil:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userId: string, data: Partial<ClientData>) => {
    try {
      const { error } = await supabase
        .from('Clients')
        .update(data)
        .eq('id_clients', userId);
      
      if (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      return false;
    }
  };

  return { userProfile, fetchUserProfile, updateUserProfile, loading };
};
