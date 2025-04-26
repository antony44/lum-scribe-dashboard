
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Info, Sparkles, Zap, X } from "lucide-react";

// Plan level constants - à remplacer par des valeurs de l'API dans un environnement réel
const USER_PLAN = {
  ARTICLES_PER_MONTH: 12, // Exemple: utilisateur avec Pack Pro (12 articles/mois)
};

// Options pour les sélecteurs
const CATEGORIES = ["Marketing Digital", "SEO", "Développement Web", "IA & Automatisation", "Finances", "Gestion d'entreprise", "E-commerce", "Management"];

const OBJECTIFS = [
  "Capturer des leads",
  "Éduquer le marché",
  "Renforcer l'autorité",
  "Améliorer le référencement",
  "Expliquer un concept",
  "Présenter un produit/service",
  "Résoudre un problème client"
];

type ToneOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

const TONE_OPTIONS: ToneOption[] = [
  { label: "Éditorial", value: "editorial" },
  { label: "Pédagogique", value: "pedagogical" },
  { label: "Synthétique", value: "synthetic" },
  { label: "Factuel", value: "factual" },
  { label: "Structuré", value: "structured" },
  { label: "Direct", value: "direct" },
  { label: "Accessible", value: "accessible" }
];

type ContentType = {
  label: string;
  value: string;
  disabled: boolean;
};

const CONTENT_TYPES: ContentType[] = [
  { label: "Article approfondi", value: "deep_article", disabled: false },
  { label: "Comparatif", value: "comparison", disabled: false },
  { label: "FAQ dédiée", value: "faq", disabled: false },
  { label: "Checklist", value: "checklist", disabled: USER_PLAN.ARTICLES_PER_MONTH < 16 },
  { label: "Synthèse de veille", value: "watch_summary", disabled: USER_PLAN.ARTICLES_PER_MONTH < 16 }
];

const AUTHORITY_LEVELS = [
  { label: "Basse", value: "low" },
  { label: "Moyenne", value: "medium" },
  { label: "Haute", value: "high" },
  { label: "Très haute", value: "very_high" }
];

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  category: string;
  companyContext: string;
  objective: string;
  subject: string;
  toneChoices: string[];
  contentType: string;
  authorityLevel: string;
  internalLinks: string[];
  bannedTopics: string;
  useEmojis: string;
  confirmation: boolean;
};

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loadingContext, setLoadingContext] = useState(false);
  const [loadingSubject, setLoadingSubject] = useState(false);
  const [internalLinks, setInternalLinks] = useState<string[]>([]);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      website: "",
      category: "",
      companyContext: "",
      objective: "",
      subject: "",
      toneChoices: [],
      contentType: "deep_article",
      authorityLevel: "medium",
      internalLinks: [],
      bannedTopics: "",
      useEmojis: "no",
      confirmation: false
    }
  });

  const watchToneChoices = watch("toneChoices", []);

  // Fonction pour simuler la génération IA du contexte d'entreprise
  const generateCompanyContext = async () => {
    const websiteValue = watch("website");
    const companyValue = watch("company");
    
    if (!companyValue && !websiteValue) {
      toast({
        title: "Information manquante",
        description: "Veuillez saisir le nom de l'entreprise ou le site web pour générer le contexte.",
        variant: "destructive"
      });
      return;
    }

    setLoadingContext(true);
    
    // Simulation d'appel API
    setTimeout(() => {
      setValue("companyContext", 
        `${companyValue || "Votre entreprise"} est spécialisée dans [secteur d'activité] et propose [produits/services] pour [cible]. 
        L'entreprise se distingue par [avantages concurrentiels] et cherche à renforcer sa position sur [marché cible].`
      );
      
      setLoadingContext(false);
      
      toast({
        title: "Contexte généré",
        description: "Le contexte a été généré automatiquement. Vous pouvez le modifier selon vos besoins.",
      });
    }, 1500);
  };

  // Fonction pour simuler la suggestion IA de sujet
  const suggestSubject = async () => {
    const companyContext = watch("companyContext");
    const objective = watch("objective");
    
    if (!companyContext || !objective) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir le contexte de l'entreprise et l'objectif pour obtenir des suggestions de sujets.",
        variant: "destructive"
      });
      return;
    }

    setLoadingSubject(true);
    
    // Simulation d'appel API
    setTimeout(() => {
      setValue("subject", 
        objective === "Capturer des leads" 
          ? "10 stratégies innovantes pour convertir vos visiteurs en clients fidèles" 
          : "Comment devenir une référence dans votre secteur d'activité en 2025"
      );
      
      setLoadingSubject(false);
      
      toast({
        title: "Sujet suggéré",
        description: "Un sujet a été suggéré automatiquement. Vous pouvez le modifier selon vos besoins.",
      });
    }, 1500);
  };

  // Gestion des liens internes
  const addInternalLink = () => {
    if (newLinkTitle.trim() && newLinkUrl.trim()) {
      const formattedLink = `${newLinkTitle.trim()}: ${newLinkUrl.trim()}`;
      setInternalLinks([...internalLinks, formattedLink]);
      setNewLinkTitle("");
      setNewLinkUrl("");
    } else {
      toast({
        title: "Champs incomplets",
        description: "Veuillez saisir à la fois le titre et l'URL du lien.",
        variant: "destructive"
      });
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...internalLinks];
    updatedLinks.splice(index, 1);
    setInternalLinks(updatedLinks);
  };

  // Soumission du formulaire
  const onSubmit = (data: FormValues) => {
    // Ajouter les liens internes aux données du formulaire
    data.internalLinks = internalLinks;

    setSubmitting(true);
    
    // Simulation d'appel API
    setTimeout(() => {
      console.log("Données soumises:", data);
      
      toast({
        title: "Commande envoyée !",
        description: "Votre demande d'article a bien été prise en compte.",
      });
      
      setSubmitting(false);
    }, 2000);
  };

  const handleReset = () => {
    reset();
    setInternalLinks([]);
  };

  return (
    <Card className="bg-white dark:bg-[#161C24] shadow-md rounded-xl overflow-hidden mb-10 border dark:border-[#202837]">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Groupe 1: Informations de base */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b dark:border-[#202837] pb-2">Informations de base</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 font-medium">Prénom</label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  {...register("firstName", { required: "Le prénom est requis" })}
                  className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block mb-1 font-medium">Nom</label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  {...register("lastName", { required: "Le nom est requis" })}
                  className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                {...register("email", { 
                  required: "L'email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide"
                  }
                })}
                className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block mb-1 font-medium">
                  Nom de l'entreprise <span className="text-destructive">*</span>
                </label>
                <Input
                  id="company"
                  placeholder="Nom de votre entreprise"
                  {...register("company", { required: "Le nom de l'entreprise est requis" })}
                  className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                  aria-invalid={errors.company ? "true" : "false"}
                />
                {errors.company && <p className="text-xs text-destructive mt-1">{errors.company.message}</p>}
              </div>
              
              <div className="relative">
                <label htmlFor="website" className="block mb-1 font-medium">Site web de l'entreprise</label>
                <div className="relative">
                  <Input
                    id="website"
                    placeholder="https://exemple.com"
                    {...register("website")}
                    className="dark:bg-[#202837] dark:border-[#202837] dark:text-white pr-10"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={generateCompanyContext}
                        aria-label="Générer le contexte avec IA"
                      >
                        <Sparkles className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Générer le contexte avec IA
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          
          {/* Groupe 2: Spécifications de l'article */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b dark:border-[#202837] pb-2">Spécifications de l'article</h2>
            
            <div>
              <label htmlFor="category" className="block mb-1 font-medium">Catégorie</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Veuillez sélectionner une catégorie" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full dark:bg-[#202837] dark:border-[#202837] dark:text-white">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#202837]">
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="companyContext" className="block font-medium">
                  Contexte de l'entreprise <span className="text-destructive">*</span>
                </label>
                <div className="flex items-center">
                  {loadingContext && (
                    <span className="mr-2 text-xs text-muted-foreground">Génération en cours...</span>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        type="button"
                        className="text-[#0061E0] hover:text-[#0061E0]/80 disabled:text-muted-foreground"
                        onClick={generateCompanyContext}
                        disabled={loadingContext}
                        aria-label="Générer le contexte avec IA"
                      >
                        {loadingContext ? (
                          <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                          <Sparkles className="h-5 w-5" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Générer le contexte avec IA
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <Textarea
                id="companyContext"
                placeholder="Décrivez l'activité, le positionnement et les spécificités de votre entreprise..."
                {...register("companyContext", { required: "Le contexte de l'entreprise est requis" })}
                className="min-h-[100px] dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                aria-invalid={errors.companyContext ? "true" : "false"}
              />
              {errors.companyContext && <p className="text-xs text-destructive mt-1">{errors.companyContext.message}</p>}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <label htmlFor="objective" className="block font-medium">Objectif de l'article</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="Plus d'informations">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Pourquoi écrire cet article ? Ex: capturer des leads, éduquer le marché...
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <Controller
                name="objective"
                control={control}
                rules={{ required: "Veuillez sélectionner un objectif" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full dark:bg-[#202837] dark:border-[#202837] dark:text-white">
                      <SelectValue placeholder="Sélectionner un objectif" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#202837]">
                      {OBJECTIFS.map((objectif) => (
                        <SelectItem key={objectif} value={objectif}>{objectif}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.objective && <p className="text-xs text-destructive mt-1">{errors.objective.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                {USER_PLAN.ARTICLES_PER_MONTH < 4 && "Débloquez plus d'options avec le pack Pro"}
              </p>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="subject" className="block font-medium">Sujet à traiter</label>
                <div className="flex items-center">
                  {loadingSubject && (
                    <span className="mr-2 text-xs text-muted-foreground">Suggestion en cours...</span>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        type="button"
                        className="text-[#0061E0] hover:text-[#0061E0]/80 disabled:text-muted-foreground"
                        onClick={suggestSubject}
                        disabled={loadingSubject}
                        aria-label="Suggérer un sujet avec IA"
                      >
                        {loadingSubject ? (
                          <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                          <Zap className="h-5 w-5" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Suggérer un sujet avec IA
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <Input
                id="subject"
                placeholder="Ex: 10 stratégies efficaces pour améliorer votre référencement en 2025"
                {...register("subject", { required: "Le sujet est requis" })}
                className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                aria-invalid={errors.subject ? "true" : "false"}
              />
              {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <label className="block font-medium">Ton souhaité <span className="text-xs text-muted-foreground ml-1">(max 2)</span></label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="Plus d'informations">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Sélectionnez jusqu'à 2 tons pour définir le style rédactionnel de votre article.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {USER_PLAN.ARTICLES_PER_MONTH < 12 && (
                  <span className="text-xs text-muted-foreground">Débloquez avec pack Avancé</span>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Controller
                  name="toneChoices"
                  control={control}
                  render={({ field }) => (
                    <>
                      {TONE_OPTIONS.map((option) => {
                        const isDisabled = USER_PLAN.ARTICLES_PER_MONTH < 12 || option.disabled;
                        const isSelected = field.value.includes(option.value);
                        const isMaxSelected = field.value.length >= 2 && !isSelected;
                        
                        return (
                          <div 
                            key={option.value} 
                            className={`
                              relative rounded-md border px-3 py-2 flex items-center gap-2
                              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                              ${isSelected 
                                ? 'border-[#0061E0] bg-[#0061E0]/10 dark:bg-[#0061E0]/20' 
                                : 'border-input dark:border-[#202837] dark:bg-[#202837]'}
                              ${isMaxSelected ? 'opacity-50' : ''}
                            `}
                            onClick={() => {
                              if (isDisabled || isMaxSelected) return;
                              
                              const newValue = isSelected
                                ? field.value.filter((val: string) => val !== option.value)
                                : [...field.value, option.value];
                                
                              field.onChange(newValue);
                            }}
                          >
                            <Checkbox
                              checked={isSelected}
                              disabled={isDisabled || isMaxSelected}
                              className={`pointer-events-none ${isSelected ? 'text-[#0061E0]' : ''}`}
                            />
                            <label className="flex-grow cursor-pointer">{option.label}</label>
                          </div>
                        );
                      })}
                    </>
                  )}
                />
              </div>
              {errors.toneChoices && <p className="text-xs text-destructive mt-1">{errors.toneChoices.message}</p>}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <label className="block font-medium">Type de contenu souhaité</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="Plus d'informations">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Sélectionnez le format qui convient le mieux à votre objectif.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {USER_PLAN.ARTICLES_PER_MONTH < 16 && (
                  <span className="text-xs text-muted-foreground">Tous les types avec pack Expert</span>
                )}
              </div>
              
              <Controller
                name="contentType"
                control={control}
                rules={{ required: "Veuillez sélectionner un type de contenu" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                  >
                    {CONTENT_TYPES.map((type) => (
                      <div 
                        key={type.value} 
                        className={`
                          relative rounded-md border px-3 py-2.5 flex items-center gap-2
                          ${type.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          ${field.value === type.value 
                            ? 'border-[#0061E0] bg-[#0061E0]/10 dark:bg-[#0061E0]/20'
                            : 'border-input dark:border-[#202837] dark:bg-[#202837]'}
                        `}
                        onClick={() => {
                          if (!type.disabled) {
                            field.onChange(type.value);
                          }
                        }}
                      >
                        <RadioGroupItem 
                          value={type.value} 
                          id={type.value} 
                          disabled={type.disabled}
                          className={field.value === type.value ? 'text-[#0061E0]' : ''}
                        />
                        <label htmlFor={type.value} className="flex-grow cursor-pointer">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.contentType && <p className="text-xs text-destructive mt-1">{errors.contentType.message}</p>}
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Autorité du blog</label>
              <Controller
                name="authorityLevel"
                control={control}
                rules={{ required: "Veuillez sélectionner un niveau d'autorité" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-2 flex-wrap"
                  >
                    {AUTHORITY_LEVELS.map((level) => (
                      <div 
                        key={level.value}
                        className={`
                          relative rounded-md border px-3 py-2 flex items-center gap-2
                          cursor-pointer
                          ${field.value === level.value 
                            ? 'border-[#0061E0] bg-[#0061E0]/10 dark:bg-[#0061E0]/20' 
                            : 'border-input dark:border-[#202837] dark:bg-[#202837]'}
                        `}
                        onClick={() => field.onChange(level.value)}
                      >
                        <RadioGroupItem 
                          value={level.value} 
                          id={level.value}
                          className={field.value === level.value ? 'text-[#0061E0]' : ''}
                        />
                        <label htmlFor={level.value} className="cursor-pointer">
                          {level.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.authorityLevel && <p className="text-xs text-destructive mt-1">{errors.authorityLevel.message}</p>}
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Liens internes</label>
              <div className="flex items-end gap-3 mb-2">
                <div className="flex-1">
                  <Input
                    placeholder="Titre de la page"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    className="dark:bg-[#202837] dark:border-[#202837] dark:text-white mb-1"
                  />
                  <Input
                    placeholder="URL de la page"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={addInternalLink}
                  className="dark:bg-[#202837] dark:hover:bg-[#202837]/70"
                >
                  Ajouter
                </Button>
              </div>
              
              {internalLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {internalLinks.map((link, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 bg-muted py-1 px-2 rounded-md text-sm dark:bg-[#202837]"
                    >
                      <span className="max-w-[200px] truncate">{link}</span>
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="text-destructive hover:text-destructive/80"
                        aria-label="Supprimer le lien"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="bannedTopics" className="block mb-1 font-medium">Sujets à bannir</label>
              <Textarea
                id="bannedTopics"
                placeholder="Listez les sujets que vous ne souhaitez pas aborder dans l'article..."
                {...register("bannedTopics")}
                className="dark:bg-[#202837] dark:border-[#202837] dark:text-white"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Émojis dans les titres ?</label>
              <Controller
                name="useEmojis"
                control={control}
                rules={{ required: "Veuillez faire un choix" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div 
                      className={`
                        relative rounded-md border px-4 py-2 flex items-center gap-2
                        cursor-pointer
                        ${field.value === "yes" 
                          ? 'border-[#0061E0] bg-[#0061E0]/10 dark:bg-[#0061E0]/20' 
                          : 'border-input dark:border-[#202837] dark:bg-[#202837]'}
                      `}
                      onClick={() => field.onChange("yes")}
                    >
                      <RadioGroupItem value="yes" id="emojis-yes" />
                      <label htmlFor="emojis-yes" className="cursor-pointer">Oui</label>
                    </div>
                    <div 
                      className={`
                        relative rounded-md border px-4 py-2 flex items-center gap-2
                        cursor-pointer
                        ${field.value === "no" 
                          ? 'border-[#0061E0] bg-[#0061E0]/10 dark:bg-[#0061E0]/20' 
                          : 'border-input dark:border-[#202837] dark:bg-[#202837]'}
                      `}
                      onClick={() => field.onChange("no")}
                    >
                      <RadioGroupItem value="no" id="emojis-no" />
                      <label htmlFor="emojis-no" className="cursor-pointer">Non</label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>
          
          {/* Groupe 3: Validation */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b dark:border-[#202837] pb-2">Validation</h2>
            
            <div className="flex items-center space-x-2">
              <Controller
                name="confirmation"
                control={control}
                rules={{ required: "Vous devez confirmer votre demande" }}
                render={({ field }) => (
                  <Checkbox
                    id="confirmation"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label
                htmlFor="confirmation"
                className="text-sm leading-none cursor-pointer"
              >
                Je confirme ma demande
              </label>
            </div>
            {errors.confirmation && <p className="text-xs text-destructive">{errors.confirmation.message}</p>}
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                type="submit" 
                className="bg-[#0061E0] hover:bg-[#0061E0]/90 text-base"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  "Commander"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="dark:bg-[#202837] dark:hover:bg-[#202837]/70 dark:border-[#202837]"
              >
                Réinitialiser le formulaire
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
