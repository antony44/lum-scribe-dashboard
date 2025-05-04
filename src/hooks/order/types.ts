
// Définition des types pour le formulaire de commande
export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  category: string;
  companyContext: string;
  objective: string;
  topic: string;
  tones: string[];
  contentType: string;
  authority: string;
  internalLinks: { title: string, url: string }[];
  bannedTopics: string;
  useEmojis: string;
  useHtml: boolean;
  htmlType: string;
  confirmed: boolean;
  otherObjective?: string;
  webhookUrl?: string;
};

export type ClientData = {
  avatar_url?: string | null;
  created_at?: string | null;
  current_plan?: string | null;
  email?: string;
  first_name?: string | null;
  id_clients?: string;
  last_name?: string | null;
  plans_id?: string;
  stripe_customer_id?: string | null;
  company_name?: string | null; // Ajout de company_name pour correspondre à la table Clients
};

export type OrderData = {
  sujet: string | null;
  objectif: string | null;
  contexte: string | null;
  categorie: string | null;
  clients_id: string;
  created_at: string;
  company_name: string | null;
  lien_blog_site: string | null;
  ton: string | null;
  statut: string;
  trigger_statut: string;
  type_de_contenu?: string | null;
  autorite?: string | null;
  emoji?: string | null;
  subject_ban?: string | null;
  html_complet?: string | null;
  liens_internes?: string | null;
};
