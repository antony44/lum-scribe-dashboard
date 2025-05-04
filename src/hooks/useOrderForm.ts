
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { User } from "@supabase/supabase-js";

// Define types for the client data and form data
export interface ClientData {
  avatar_url: string | null;
  created_at: string | null;
  current_plan: string | null;
  email: string;
  first_name: string | null;
  id_clients: string;
  last_name: string | null;
  plans_id: string;
  stripe_customer_id: string | null;
  company_name?: string | null;
}

export interface OrderFormData {
  prenom: string;
  nom: string;
  email: string;
  entreprise: string;
  site_web: string;
  categorie: string;
  contexte: string;
  sujet: string;
  objectif: string;
  ton: string;
}

export interface UseOrderFormResult {
  formData: OrderFormData;
  setFormData: (data: Partial<OrderFormData>) => void;
  isLoading: boolean;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  user: User | null;
}

export function useOrderForm(user: User | null): UseOrderFormResult {
  // Form state
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [site_web, setSiteWeb] = useState("");
  const [categorie, setCategorie] = useState("");
  const [contexte, setContexte] = useState("");
  const [sujet, setSujet] = useState("");
  const [objectif, setObjectif] = useState("");
  const [ton, setTon] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Combined form data object for easier updates
  const formData = {
    prenom,
    nom,
    email,
    entreprise,
    site_web,
    categorie,
    contexte,
    sujet,
    objectif,
    ton
  };

  // Function to update form data
  const setFormData = (data: Partial<OrderFormData>) => {
    if (data.prenom !== undefined) setPrenom(data.prenom);
    if (data.nom !== undefined) setNom(data.nom);
    if (data.email !== undefined) setEmail(data.email);
    if (data.entreprise !== undefined) setEntreprise(data.entreprise);
    if (data.site_web !== undefined) setSiteWeb(data.site_web);
    if (data.categorie !== undefined) setCategorie(data.categorie);
    if (data.contexte !== undefined) setContexte(data.contexte);
    if (data.sujet !== undefined) setSujet(data.sujet);
    if (data.objectif !== undefined) setObjectif(data.objectif);
    if (data.ton !== undefined) setTon(data.ton);
  };

  // Load user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
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
    };

    fetchUserProfile();
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      toast.error("Vous devez être connecté pour passer une commande");
      setIsSubmitting(false);
      return;
    }

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
      setFormData({
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
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    isSubmitting,
    handleSubmit,
    user
  };
}
