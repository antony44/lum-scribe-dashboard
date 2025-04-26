
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Info,
  Star, 
  Check, 
  Plus, 
  Trash2, 
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// Simulate user's subscription plan
const USER_PLAN = {
  articlesPerMonth: 4,  // Set to different values to test UI states
  isPremium: true
};

// Form type definition
type OrderFormValues = {
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
  internalLinks: Array<{title: string, url: string}>;
  bannedTopics: string;
  useEmojis: string;
  useHtml: boolean;
  htmlType: string;
  confirmed: boolean;
};

const OBJECTIVES = [
  { value: "lead_generation", label: "Capturer des leads" },
  { value: "education", label: "Éduquer le marché" },
  { value: "seo", label: "Améliorer le référencement" },
  { value: "authority", label: "Établir une autorité" },
  { value: "conversion", label: "Augmenter les conversions" }
];

const TONE_OPTIONS = [
  { value: "editorial", label: "Éditorial" },
  { value: "educational", label: "Pédagogique" },
  { value: "synthetic", label: "Synthétique" },
  { value: "factual", label: "Factuel" },
  { value: "structured", label: "Structuré" },
  { value: "direct", label: "Direct" },
  { value: "accessible", label: "Accessible" },
  { value: "custom", label: "Autre..." }
];

const CONTENT_TYPES = [
  { value: "in_depth", label: "Article approfondi" },
  { value: "comparison", label: "Comparatif" },
  { value: "faq", label: "FAQ dédiée" },
  { value: "checklist", label: "Checklist" },
  { value: "synthesis", label: "Synthèse de veille" }
];

const AUTHORITY_LEVELS = [
  { value: "low", label: "Basse" },
  { value: "medium", label: "Moyenne" },
  { value: "high", label: "Haute" },
  { value: "very_high", label: "Très haute" }
];

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [internalLinks, setInternalLinks] = useState<{title: string, url: string}[]>([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  
  // Initialize form with react-hook-form
  const form = useForm<OrderFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      website: "",
      category: "",
      companyContext: "",
      objective: "",
      topic: "",
      tones: [],
      contentType: "in_depth",
      authority: "medium",
      internalLinks: [],
      bannedTopics: "",
      useEmojis: "no",
      useHtml: false,
      htmlType: "embed",
      confirmed: false,
    }
  });
  
  // Form submission handler
  const onSubmit = (data: OrderFormValues) => {
    setSubmitting(true);
    
    // Include internal links in submission data
    data.internalLinks = internalLinks;
    
    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Commande envoyée avec succès", {
        description: "Votre article sera prêt dans les prochaines 48h",
      });
      console.log("Form submitted:", data);
      
      // Reset form after submission
      form.reset();
      setInternalLinks([]);
    }, 1500);
  };
  
  // Helper function to generate content with AI
  const generateWithAI = async (field: string) => {
    setGenerating(field);
    const website = form.getValues("website");
    const company = form.getValues("company");
    
    // Simulate AI generation delay
    setTimeout(() => {
      if (field === "companyContext" && (website || company)) {
        form.setValue("companyContext", `${company || "Votre entreprise"} est spécialisée dans les solutions innovantes qui répondent aux besoins de ses clients avec une approche centrée sur la qualité et la satisfaction. Avec plusieurs années d'expérience dans le secteur, l'entreprise se distingue par son expertise et sa capacité à s'adapter aux évolutions du marché.`);
      }
      
      setGenerating(null);
      
      toast.success("Contenu généré", {
        description: "Le texte a été généré avec succès par notre IA",
      });
    }, 1800);
  };
  
  // Handle adding an internal link
  const addInternalLink = () => {
    if (newLink.title && newLink.url) {
      setInternalLinks([...internalLinks, { ...newLink }]);
      setNewLink({ title: "", url: "" });
    }
  };
  
  // Handle removing an internal link
  const removeInternalLink = (index: number) => {
    setInternalLinks(internalLinks.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full shadow-md dark:bg-[#161C24] border-zinc-200 dark:border-zinc-800">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Informations de base */}
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b dark:border-zinc-800">
                Informations de base
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "L'email est requis", pattern: { value: /^\S+@\S+$/i, message: "Format d'email invalide" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jean.dupont@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="company"
                  rules={{ required: "Le nom de l'entreprise est requis" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Entreprise <span className="text-[#B91226]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de votre entreprise" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Site web entreprise
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 2: Spécifications de l'article */}
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b dark:border-zinc-800">
                Spécifications de l'article
              </h2>
              
              {/* Catégorie */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="seo">SEO</SelectItem>
                          <SelectItem value="content">Content Marketing</SelectItem>
                          <SelectItem value="social">Réseaux sociaux</SelectItem>
                          <SelectItem value="tech">Technologie</SelectItem>
                          <SelectItem value="business">Business & Stratégie</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Contexte entreprise avec IA */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="companyContext"
                  rules={{ required: "Le contexte de l'entreprise est requis" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Contexte de l'entreprise <span className="text-[#B91226]">*</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5 rounded-full p-0"
                              type="button"
                              onClick={() => generating !== "companyContext" && generateWithAI("companyContext")}
                              disabled={generating === "companyContext" || (!form.getValues("website") && !form.getValues("company"))}
                            >
                              {generating === "companyContext" ? (
                                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-[#0061E0] animate-spin" />
                              ) : (
                                <Star className="h-4 w-4 text-[#0061E0]" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Générer le contexte avec IA
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre entreprise, son positionnement et sa cible..."
                          className="min-h-24 resize-y"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs">
                        Utilisez l'icône ✨ pour générer automatiquement à partir de votre site web
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Objectif de l'article */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Objectif de l'article
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Quel est le but principal de votre article?
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger 
                            className={USER_PLAN.articlesPerMonth < 4 ? "opacity-60 cursor-not-allowed" : ""}
                            disabled={USER_PLAN.articlesPerMonth < 4}
                          >
                            <SelectValue placeholder="Sélectionner un objectif" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {OBJECTIVES.map((objective) => (
                            <SelectItem key={objective.value} value={objective.value}>
                              {objective.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {USER_PLAN.articlesPerMonth < 4 && (
                        <FormDescription className="text-xs text-amber-600 dark:text-amber-400">
                          Débloquez avec le pack Pro (4+ articles/mois)
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Sujet à traiter */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Sujet à traiter
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Si vous ne saisissez pas de sujet, notre moteur sélectionnera automatiquement le sujet SEO le plus pertinent en fonction du contexte de l'entreprise et de la catégorie.
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Les 10 meilleures stratégies pour..." 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Ton souhaité (multi-sélection) */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <FormLabel className="text-sm font-medium">
                    Ton souhaité <span className="text-xs text-muted-foreground">(max 2)</span>
                  </FormLabel>
                  {USER_PLAN.articlesPerMonth < 12 && (
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      Débloquez avec le pack Avancé (12+ articles/mois)
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TONE_OPTIONS.map((tone) => (
                    <div key={tone.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tone-${tone.value}`}
                        disabled={USER_PLAN.articlesPerMonth < 12 || (form.watch("tones").length >= 2 && !form.watch("tones").includes(tone.value))}
                        className={USER_PLAN.articlesPerMonth < 12 ? "opacity-60" : ""}
                        checked={form.watch("tones").includes(tone.value)}
                        onCheckedChange={(checked) => {
                          const currentTones = form.getValues("tones");
                          if (checked) {
                            if (currentTones.length < 2) {
                              form.setValue("tones", [...currentTones, tone.value]);
                            }
                          } else {
                            form.setValue("tones", currentTones.filter(t => t !== tone.value));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`tone-${tone.value}`}
                        className={`text-sm ${USER_PLAN.articlesPerMonth < 12 ? "text-muted-foreground" : ""}`}
                      >
                        {tone.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Type de contenu (radio) */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-1">
                        <FormLabel>Type de contenu souhaité</FormLabel>
                        {USER_PLAN.articlesPerMonth < 16 && (
                          <span className="text-xs text-amber-600 dark:text-amber-400">
                            Débloquez avec le pack Expert (16+ articles/mois)
                          </span>
                        )}
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                          disabled={USER_PLAN.articlesPerMonth < 16}
                        >
                          {CONTENT_TYPES.map((type) => (
                            <div key={type.value} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={type.value} 
                                id={`content-type-${type.value}`}
                                className={USER_PLAN.articlesPerMonth < 16 ? "opacity-60" : ""}
                                disabled={USER_PLAN.articlesPerMonth < 16}
                              />
                              <label 
                                htmlFor={`content-type-${type.value}`}
                                className={`text-sm ${USER_PLAN.articlesPerMonth < 16 ? "text-muted-foreground" : ""}`}
                              >
                                {type.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Autorité du blog (radio) */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="authority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Autorité du blog/site</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          {AUTHORITY_LEVELS.map((level) => (
                            <div key={level.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={level.value} id={`authority-${level.value}`} />
                              <label htmlFor={`authority-${level.value}`} className="text-sm">
                                {level.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Liens internes */}
              <div className="mb-4">
                <FormLabel className="block mb-1">Liens internes à inclure</FormLabel>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <Input
                      placeholder="Texte d'ancrage"
                      className="md:col-span-2"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    />
                    <Input
                      placeholder="URL du lien"
                      className="md:col-span-2"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    />
                    <Button 
                      type="button"
                      onClick={addInternalLink}
                      disabled={!newLink.title || !newLink.url}
                      className="w-full md:w-auto"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Ajouter
                    </Button>
                  </div>

                  {internalLinks.length > 0 && (
                    <div className="mt-2 border rounded-md p-2 dark:border-zinc-800 space-y-2">
                      {internalLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-1.5 bg-zinc-50 dark:bg-zinc-900 rounded">
                          <div className="truncate flex-1 mr-2">
                            <span className="font-medium">{link.title}</span>
                            <span className="mx-1">→</span>
                            <span className="text-muted-foreground text-xs truncate">{link.url}</span>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            type="button" 
                            className="h-6 w-6" 
                            onClick={() => removeInternalLink(index)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sujets à bannir */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="bannedTopics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujets à bannir</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Liste des sujets à ne pas aborder dans l'article..."
                          className="resize-y"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Émojis dans les titres */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="useEmojis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Émojis dans les titres ?
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Les emojis améliorent l'UX dans la plupart des cas, mais il vaut mieux éviter dans les sujets sérieux (droit, administration, institutions).
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="emojis-yes" />
                            <label htmlFor="emojis-yes" className="text-sm">Oui</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="emojis-no" />
                            <label htmlFor="emojis-no" className="text-sm">Non</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* HTML Option */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="useHtml"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                            id="use-html"
                          />
                        </FormControl>
                        <label htmlFor="use-html" className="text-sm font-medium">
                          Voulez-vous l'HTML ?
                        </label>
                      </div>
                      
                      {field.value && (
                        <FormField
                          control={form.control}
                          name="htmlType"
                          render={({ field }) => (
                            <FormItem className="ml-6 mt-2">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="embed" id="html-embed" />
                                    <label htmlFor="html-embed" className="text-sm">HTML embed</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="complete" id="html-complete" />
                                    <label htmlFor="html-complete" className="text-sm">HTML complet</label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Section 3: Validation */}
            <div className="pt-2 border-t dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <Controller
                  name="confirmed"
                  control={form.control}
                  rules={{ required: "Vous devez confirmer votre commande" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Je confirme ma demande <span className="text-[#B91226]">*</span>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="order-2 sm:order-1 flex items-center gap-1"
                  onClick={() => form.reset()}
                >
                  <RefreshCw className="h-4 w-4" /> Réinitialiser
                </Button>
                
                <Button
                  type="submit"
                  className="bg-[#0061E0] hover:bg-[#0061E0]/90 order-1 sm:order-2 text-base px-10 py-3 h-auto transition-all"
                  disabled={submitting || !form.formState.isValid}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full border-2 border-white border-r-transparent h-4 w-4" />
                      Envoi...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Commander
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
