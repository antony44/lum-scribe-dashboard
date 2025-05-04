
import { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { useOrderFormState } from './order/useOrderFormState';
import { useSubmitOrder } from './order/useSubmitOrder';
import { FormValues } from './order/types';
import { useAuth } from '@/components/AuthProvider';

// Re-export des types pour une utilisation externe
export type { FormValues } from './order/types';

const useOrderForm = (showWebhookSettings = false) => {
  const {
    form,
    submitting,
    setSubmitting,
    generating,
    setGenerating,
    internalLinks,
    setInternalLinks,
    newLink,
    setNewLink,
    showWebhookConfigPanel,
    setShowWebhookConfigPanel,
    webhookUrl,
    setWebhookUrl,
    DEFAULT_WEBHOOK_URL
  } = useOrderFormState(showWebhookSettings);

  const { submitOrderToSupabase, submitOrderToWebhook } = useSubmitOrder();
  const { user } = useAuth();

  // Charge le webhook URL sauvegardé depuis localStorage si disponible
  useEffect(() => {
    if (showWebhookSettings) {
      const savedWebhookUrl = localStorage.getItem("orderFormWebhookUrl");
      if (savedWebhookUrl) {
        setWebhookUrl(savedWebhookUrl);
        form.setValue("webhookUrl", savedWebhookUrl);
      } else {
        localStorage.setItem("orderFormWebhookUrl", DEFAULT_WEBHOOK_URL);
      }
    }
  }, [form, showWebhookSettings, DEFAULT_WEBHOOK_URL, setWebhookUrl]);

  // Fonction pour générer du contenu avec IA
  const generateWithAI = async (field: string) => {
    setGenerating(field);
    const website = form.getValues("website");
    const company = form.getValues("company");
    
    setTimeout(() => {
      if (field === "companyContext" && (website || company)) {
        form.setValue("companyContext", `${company || "Votre entreprise"} est spécialisée dans [secteur d'activité] et propose [produits/services] pour [cible]. L'entreprise se distingue par [avantages concurrentiels] et cherche à renforcer sa position sur [marché cible].`);
      }
      
      setGenerating(null);
      
      toast.success("Contenu généré", {
        description: "Le texte a été généré avec succès par le moteur LÜM",
      });
    }, 1800);
  };

  // Fonctions pour gérer les liens internes
  const addInternalLink = () => {
    if (newLink.title && newLink.url && internalLinks.length < 10) {
      setInternalLinks([...internalLinks, { ...newLink }]);
      setNewLink({ title: "", url: "" });
    } else if (internalLinks.length >= 10) {
      toast.error("Vous ne pouvez pas ajouter plus de 10 liens internes");
    }
  };
  
  const removeInternalLink = (index: number) => {
    setInternalLinks(internalLinks.filter((_, i) => i !== index));
  };

  // Configuration du webhook
  const handleWebhookSave = () => {
    form.setValue("webhookUrl", webhookUrl);
    localStorage.setItem("orderFormWebhookUrl", webhookUrl);
    setShowWebhookConfigPanel(false);
    toast.success("Webhook enregistré", {
      description: "Votre webhook a été configuré avec succès.",
    });
  };

  // Soumission du formulaire
  const onSubmit = async (data: FormValues) => {
    if (!user?.id) {
      toast.error("Vous devez être connecté pour soumettre une commande");
      return;
    }

    setSubmitting(true);
    
    // Ajouter les liens internes aux données du formulaire
    data.internalLinks = internalLinks;
    
    try {
      // Enregistrer dans Supabase
      const supabaseResult = await submitOrderToSupabase(data, user.id);
      
      // Utiliser le webhook (si configuré)
      const hookUrl = data.webhookUrl || DEFAULT_WEBHOOK_URL;
      const webhookResult = await submitOrderToWebhook(data, hookUrl);
      
      if (!webhookResult) {
        toast.error("Erreur lors de l'envoi des données au webhook", {
          description: "Vos données ont été enregistrées localement mais l'intégration avec Make a échoué.",
        });
      }
      
      if (supabaseResult) {
        setTimeout(() => {
          setSubmitting(false);
          toast.success("Commande envoyée avec succès", {
            description: "Votre article sera prêt dans les prochaines 48h",
          });
          
          form.reset();
          setInternalLinks([]);
          
          // Réinitialiser le formulaire mais conserver l'URL du webhook
          if (showWebhookSettings) {
            form.setValue("webhookUrl", webhookUrl);
          }
        }, 1500);
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      setSubmitting(false);
      toast.error("Erreur lors de l'envoi du formulaire", {
        description: "Veuillez réessayer ou contacter le support.",
      });
    }
  };

  return {
    form,
    submitting,
    generating,
    internalLinks,
    newLink,
    showWebhookConfigPanel,
    webhookUrl,
    onSubmit,
    generateWithAI,
    addInternalLink,
    removeInternalLink,
    handleWebhookSave,
    setNewLink,
    setShowWebhookConfigPanel,
    setWebhookUrl,
  };
};

export default useOrderForm;
