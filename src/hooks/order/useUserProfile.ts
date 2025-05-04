
import { useEffect } from 'react';
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { ClientData, OrderFormData } from './types';
import { UseOrderFormStateResult } from './useOrderFormState';

export async function fetchUserProfile(
  user: User | null,
  { setFormData, setIsLoading }: Pick<UseOrderFormStateResult, 'setFormData' | 'setIsLoading'>
): Promise<void> {
  if (!user) {
    setIsLoading(false);
    return;
  }

  try {
    const { data, error } = await supabase
      .from('Clients')
      .select('*')
      .eq('id_clients', user.id)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      toast.error("Erreur lors du chargement de votre profil");
    } else if (data) {
      // Préremplir le formulaire avec les données du profil
      const clientData = data as ClientData;
      setFormData({
        prenom: clientData.first_name || "",
        nom: clientData.last_name || "",
        email: user.email || "",
        entreprise: clientData.company_name || ""
      });
      
      // Récupérer les données de la dernière commande de l'utilisateur pour le site web
      const { data: lastOrderData, error: lastOrderError } = await supabase
        .from('Commandes')
        .select('lien_blog_site')
        .eq('clients_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (!lastOrderError && lastOrderData && lastOrderData.length > 0) {
        setFormData({ site_web: lastOrderData[0].lien_blog_site || "" });
      }
    }
  } catch (error) {
    console.error("Erreur:", error);
  } finally {
    setIsLoading(false);
  }
}

export function useUserProfile(
  user: User | null,
  formState: Pick<UseOrderFormStateResult, 'setFormData' | 'setIsLoading'>
): void {
  useEffect(() => {
    fetchUserProfile(user, formState);
  }, [user]);
}
