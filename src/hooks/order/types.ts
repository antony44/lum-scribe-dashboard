
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
  company_name: string | null;
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
