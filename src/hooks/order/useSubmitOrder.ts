
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormValues, OrderData } from './types';
import { useUserProfile } from './useUserProfile';

export const useSubmitOrder = () => {
  const { updateUserProfile } = useUserProfile();

  const prepareOrderData = (data: FormValues, clientId: string): OrderData => {
    return {
      sujet: data.topic || null,
      objectif: data.objective || null,
      contexte: data.companyContext || null,
      categorie: data.category || null,
      clients_id: clientId,
      created_at: new Date().toISOString(),
      company_name: data.company || null,
      lien_blog_site: data.website || null,
      ton: data.tones.join(', ') || null,
      statut: 'en_attente',
      trigger_statut: new Date().toISOString(),
      type_de_contenu: data.contentType || null,
      autorite: data.authority || null,
      emoji: data.useEmojis === 'yes' ? 'oui' : 'non',
      subject_ban: data.bannedTopics || null,
      html_complet: data.useHtml ? data.htmlType : null,
      liens_internes: data.internalLinks.length > 0 ? JSON.stringify(data.internalLinks) : null,
    };
  };

  const submitOrderToSupabase = async (
    formData: FormValues,
    clientId: string
  ): Promise<boolean> => {
    try {
      // Préparer les données pour la base de données
      const orderData = prepareOrderData(formData, clientId);

      // Enregistrement dans la base de données Supabase
      const { data, error } = await supabase
        .from('Commandes')
        .insert([orderData])
        .select();

      if (error) {
        console.error('Erreur Supabase:', error);
        toast.error("Erreur lors de l'enregistrement de la commande.");
        return false;
      }

      console.log('Commande enregistrée avec succès:', data);

      // Mise à jour du profil utilisateur avec le nom de l'entreprise
      if (formData.company) {
        const updateResult = await updateUserProfile(clientId, {
          company_name: formData.company
        });
        
        if (!updateResult) {
          console.warn("Impossible de mettre à jour le profil utilisateur");
        }
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      return false;
    }
  };

  const submitOrderToWebhook = async (
    formData: FormValues,
    hookUrl: string
  ): Promise<boolean> => {
    try {
      console.log("Envoi des données au webhook:", hookUrl);
      
      // Envoi des données au webhook (Make.com)
      await fetch(hookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: "LUM Content Order Form"
        }),
      });
      
      console.log("Webhook déclenché avec succès");
      return true;
    } catch (webhookError) {
      console.error("Erreur lors du déclenchement du webhook:", webhookError);
      return false;
    }
  };

  return { submitOrderToSupabase, submitOrderToWebhook };
};
