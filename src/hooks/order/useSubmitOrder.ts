
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { OrderFormData } from './types';
import { UseOrderFormStateResult } from './useOrderFormState';

export interface SubmitOrderProps {
  user: User | null;
  formData: OrderFormData;
  formState: Pick<UseOrderFormStateResult, 'setFormData' | 'setIsSubmitting'>;
}

export async function submitOrder(
  e: React.FormEvent,
  { user, formData, formState }: SubmitOrderProps
): Promise<void> {
  e.preventDefault();
  formState.setIsSubmitting(true);

  if (!user) {
    toast.error("Vous devez être connecté pour passer une commande");
    formState.setIsSubmitting(false);
    return;
  }

  const { 
    sujet, objectif, contexte, categorie, 
    entreprise, site_web, ton 
  } = formData;

  // Préparer les données pour la base de données
  const formDataForDb = {
    sujet,
    objectif,
    contexte,
    categorie,
    clients_id: user.id,
    created_at: new Date().toISOString(),
    company_name: entreprise,
    lien_blog_site: site_web,
    ton,
    statut: 'en_attente',
    trigger_statut: new Date().toISOString(),
  };

  try {
    // Enregistrement dans la base de données Supabase
    const { data, error } = await supabase
      .from('Commandes')
      .insert([formDataForDb])
      .select();

    if (error) {
      console.error('Erreur Supabase:', error);
      toast.error("Erreur lors de l'enregistrement de la commande.");
      return;
    }
    
    console.log('Commande enregistrée avec succès:', data);
    toast.success("Commande enregistrée avec succès !");
    
    // Mise à jour du profil utilisateur si nécessaire
    if (entreprise) {
      const updateData = {
        company_name: entreprise
      };

      const { error: updateError } = await supabase
        .from('Clients')
        .update(updateData)
        .eq('id_clients', user.id);

      if (updateError) {
        console.error('Erreur lors de la mise à jour du profil:', updateError);
      }
    }
    
    // Réinitialisation des champs qui ne sont pas des informations utilisateur
    formState.setFormData({
      categorie: "",
      contexte: "",
      sujet: "",
      objectif: "",
      ton: ""
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
    toast.error("Erreur lors de l'enregistrement de la commande.");
  } finally {
    formState.setIsSubmitting(false);
  }
}
