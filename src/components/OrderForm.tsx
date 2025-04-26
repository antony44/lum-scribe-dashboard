
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

type FormValues = {
  prenom: string;
  email: string;
  sujet: string;
  objectif: string;
  style: string;
  lien: string;
  titre: string;
  personnalisation: string;
  anciens: string[];
  confirme: boolean;
};

const IS_PLAN_PREMIUM = false; // Hardcoded for demo. Change as needed.

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [articleLinks, setArticleLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    clearErrors,
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      prenom: "",
      email: "",
      sujet: "",
      objectif: "",
      style: "",
      lien: "",
      titre: "",
      personnalisation: "",
      anciens: [],
      confirme: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (articleLinks.length) {
      data.anciens = articleLinks;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Commande envoyée",
        description: "Votre demande d’article a bien été prise en compte 🎉",
      });
      reset();
      setArticleLinks([]);
    }, 1200);
  };

  // Handle "Ajouter un article" click & logic
  const addArticleLink = () => {
    if (!newLink.trim()) {
      setError("anciens", { type: "manual", message: "Le champ ne peut pas être vide" });
      return;
    }
    setArticleLinks([...articleLinks, newLink.trim()]);
    setNewLink("");
    clearErrors("anciens");
  };

  const removeLink = (idx: number) => {
    setArticleLinks(articleLinks.filter((_, i) => i !== idx));
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Left side: Form fields */}
          <div className="space-y-4">
            {/* Prénom & Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom" className="font-medium mb-1 block">
                  Prénom
                </label>
                <Input
                  id="prenom"
                  type="text"
                  placeholder="Lucien"
                  {...register("prenom", { required: "Prénom requis" })}
                  aria-invalid={!!errors.prenom}
                />
                {errors.prenom && (
                  <span className="text-destructive text-xs">{errors.prenom.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="email" className="font-medium mb-1 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="lucien@example.com"
                  {...register("email", {
                    required: "Email requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email invalide",
                    },
                  })}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span className="text-destructive text-xs">{errors.email.message}</span>
                )}
              </div>
            </div>
            {/* Sujet à traiter */}
            <div>
              <label htmlFor="sujet" className="font-medium mb-1 block flex items-center gap-1">
                Sujet à traiter
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="size-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Thème principal ou angle à aborder dans l’article.
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                id="sujet"
                placeholder="Ex. tendances marketing digital"
                {...register("sujet", { required: "Champ requis" })}
                aria-invalid={!!errors.sujet}
              />
              {errors.sujet && (
                <span className="text-destructive text-xs">{errors.sujet.message}</span>
              )}
            </div>
            {/* Objectif + Style rédactionnel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="objectif" className="font-medium mb-1 block flex items-center gap-1">
                  Objectif de l’article
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Info className="size-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Pourquoi écrire cet article ? (Ex : transmettre une expertise, générer du trafic…)
                    </TooltipContent>
                  </Tooltip>
                </label>
                <Textarea
                  id="objectif"
                  placeholder="Ex. éduquer les lecteurs sur les meilleures pratiques…"
                  rows={2}
                  {...register("objectif", { required: "Champ requis" })}
                  aria-invalid={!!errors.objectif}
                />
                {errors.objectif && (
                  <span className="text-destructive text-xs">{errors.objectif.message}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <label htmlFor="style" className="font-medium mb-1 block">
                    Style rédactionnel attendu
                  </label>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Info className="size-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Ton, niveau de formalité, complexité attendue…
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="style"
                  placeholder="Ex. pédagogique, accessible, expert…"
                  {...register("style", { required: "Champ requis" })}
                  aria-invalid={!!errors.style}
                />
                <small className="block text-xs text-muted-foreground mt-0.5">
                  Débloquez la personnalisation avancée avec le Pack Pro 12+ articles
                </small>
                {errors.style && (
                  <span className="text-destructive text-xs">{errors.style.message}</span>
                )}
              </div>
            </div>
            {/* Lien du blog/LinkedIn/Autre */}
            <div>
              <label htmlFor="lien" className="font-medium mb-1 block flex items-center gap-1">
                Lien du blog/LinkedIn/Autre
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="size-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Où sera publié l’article ou une référence utile.
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                id="lien"
                placeholder="Ex, https://exemple.com/blog"
                {...register("lien", {})}
                aria-invalid={!!errors.lien}
              />
            </div>
            {/* Titre de l’article souhaité */}
            <div>
              <label htmlFor="titre" className="font-medium mb-1 block flex items-center gap-1">
                Titre de l’article souhaité
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="size-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Si vous avez un titre spécifique en tête.
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                id="titre"
                placeholder="Ex. Stratégies de marketing digital pour 2024"
                {...register("titre", {})}
                aria-invalid={!!errors.titre}
              />
            </div>
            {/* Sélection personnalisation avancée (si plan premium) */}
            {IS_PLAN_PREMIUM && (
              <div>
                <label htmlFor="personnalisation" className="font-medium mb-1 block">
                  Sélection personnalisation avancée
                </label>
                <Input
                  id="personnalisation"
                  placeholder="Préciser ici si besoin de personnalisation avancée"
                  {...register("personnalisation", {})}
                  aria-invalid={!!errors.personnalisation}
                />
                <small className="block text-xs text-muted-foreground mt-0.5">
                  Débloquez encore plus d’options avec le Pack Pro 12+ articles
                </small>
              </div>
            )}
            {/* Anciens articles à lier */}
            <div>
              <label htmlFor="anciens" className="font-medium mb-1 block flex items-center gap-1">
                Ancien(s) article(s) à lier
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="size-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Pour contextualiser, ajoutez les liens d’anciens articles si besoin.
                  </TooltipContent>
                </Tooltip>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="anciens"
                  placeholder="Ajouter un article"
                  value={newLink}
                  onChange={e => setNewLink(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArticleLink();
                    }
                  }}
                  aria-invalid={!!errors.anciens}
                />
                <Button type="button" size="sm" variant="secondary" onClick={addArticleLink}>
                  Ajouter
                </Button>
              </div>
              {errors.anciens && (
                <span className="text-destructive text-xs">{errors.anciens.message}</span>
              )}
              <div className="flex flex-wrap gap-2 mt-1">
                {articleLinks.map((link, idx) => (
                  <span
                    key={link + idx}
                    className="flex items-center bg-muted px-2 py-1 rounded text-xs"
                  >
                    {link}
                    <button
                      type="button"
                      onClick={() => removeLink(idx)}
                      className="ml-1 text-destructive hover:underline"
                      aria-label="Supprimer"
                      style={{ fontSize: 12 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {/* Confirm Checkbox */}
            <div className="flex items-center mt-3">
              <Controller
                name="confirme"
                control={control}
                rules={{ required: "Merci de confirmer votre demande" }}
                render={({ field }) => (
                  <Checkbox
                    id="confirme"
                    checked={!!field.value}
                    onCheckedChange={checked => field.onChange(!!checked)}
                    aria-invalid={!!errors.confirme}
                  />
                )}
              />
              <label htmlFor="confirme" className="ml-2 select-none text-sm">
                Je confirme ma demande
              </label>
            </div>
            {errors.confirme && (
              <span className="text-destructive text-xs">{errors.confirme.message}</span>
            )}
            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                className="w-full md:w-auto text-base px-10 py-3 transition-all"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full border-2 border-blue-600 border-r-transparent h-4 w-4" />
                    Envoi...
                  </span>
                ) : (
                  <>Commander</>
                )}
              </Button>
            </div>
            {/* Visual ref: ChatGPT Image 25 avr. 2025, 21_05_58.png */}
          </div>
          {/* Right side: Help block */}
          <div className="dark:bg-[#161C24] rounded-xl p-6 border text-sm min-h-[180px] flex flex-col mb-4 md:mb-0 hover:dark:bg-[#202837] transition-colors">
            <div className="font-semibold mb-3 dark:text-white">Besoin d'aide&nbsp;?</div>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-[#0061E0] hover:underline"
                tabIndex={0}
              >
                Exemple de consigne efficace
              </a>
              <a
                href="#"
                className="text-[#0061E0] hover:underline"
                tabIndex={0}
              >
                Bonnes pratiques de rédaction
              </a>
              <a
                href="#"
                className="text-[#0061E0] hover:underline"
                tabIndex={0}
              >
                Contactez le support
              </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
