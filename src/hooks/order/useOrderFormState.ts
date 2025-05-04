
import { useState } from 'react';
import { OrderFormData } from './types';

export interface UseOrderFormStateResult {
  formData: OrderFormData;
  setFormData: (data: Partial<OrderFormData>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function useOrderFormState(): UseOrderFormStateResult {
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

  return {
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    isSubmitting,
    setIsSubmitting
  };
}
