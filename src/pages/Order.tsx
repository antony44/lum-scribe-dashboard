import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
  
  // Pre-fill form with user data if available
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        setEmail(user.email || '');
        
        // Fetch user profile data if available
        const { data, error } = await supabase
          .from('Clients')
          .select('first_name, last_name')
          .eq('id_clients', user.id)
          .single();
          
        if (data && !error) {
          setPrenom(data.first_name || '');
          setNom(data.last_name || '');
        }
      }
    };
    
    loadUserData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let clientId = user?.id;
      
      // Si l'utilisateur est authentifié, nous utilisons son ID
      if (user) {
        // Mettre à jour les informations du client si nécessaire
        const { error: updateError } = await supabase
          .from('Clients')
          .update({
            first_name: prenom,
            last_name: nom,
            email: email,
          })
          .eq('id_clients', user.id);
          
        if (updateError) {
          console.error("Erreur lors de la mise à jour du client:", updateError);
          toast.error("Erreur lors de la mise à jour des informations client.");
        }
      } 
      // Sinon, pour un utilisateur anonyme, nous créons un nouveau client
      else {
        // S'assurer que nous avons un plan par défaut dans la base de données
        const { data: defaultPlanData, error: defaultPlanError } = await supabase
          .from('Plans')
          .select('id_plans')
          .eq('nom', 'Basic')
          .limit(1);

        let defaultPlanId;
        
        if (defaultPlanError || !defaultPlanData || defaultPlanData.length === 0) {
          // Utiliser un UUID fixe si aucun plan par défaut n'est trouvé
          defaultPlanId = '00000000-0000-0000-0000-000000000000';
        } else {
          defaultPlanId = defaultPlanData[0].id_plans;
        }

        // Insérer un nouveau client
        const { data: clientData, error: clientError } = await supabase
          .from('Clients')
          .insert({
            first_name: prenom,
            last_name: nom,
            email: email,
            plans_id: defaultPlanId
          })
          .select('id_clients');

        if (clientError) {
          console.error("Erreur lors de la création du client:", clientError);
          toast.error("Erreur lors de la création du client.");
          setIsSubmitting(false);
          return;
        }

        clientId = clientData?.[0]?.id_clients;
        
        if (!clientId) {
          console.error("Impossible de récupérer l'ID client");
          toast.error("Erreur lors du traitement de la commande.");
          setIsSubmitting(false);
          return;
        }
      }

      // Récupérer l'ID du plan du client
      const { data: clientPlanData, error: clientPlanError } = await supabase
        .from('Clients')
        .select('plans_id')
        .eq('id_clients', clientId)
        .single();

      let planId;
      if (clientPlanError || !clientPlanData) {
        // Utiliser un UUID fixe si aucun plan n'est trouvé
        planId = '00000000-0000-0000-0000-000000000000';
      } else {
        planId = clientPlanData.plans_id;
      }

      // Insérer les données dans la table Commandes
      const { data: commandeData, error: commandeError } = await supabase
        .from('Commandes')
        .insert([
          {
            clients_id: clientId,
            company_name: entreprise,
            lien_blog_site: site_web,
            categorie: categorie,
            contexte: contexte,
            sujet: sujet,
            objectif: objectif,
            ton: ton,
            statut: "nouvelle", // Statut par défaut pour une nouvelle commande
            plans_id: planId
          }
        ])
        .select();

      if (commandeError) {
        console.error("Erreur lors de la création de la commande:", commandeError);
        toast.error("Erreur lors de la création de la commande.");
        setIsSubmitting(false);
        return;
      }

      console.log("Commande créée avec succès:", commandeData);

      // Envoyer également au webhook comme système de sauvegarde
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
        ton,
      };

      try {
        await fetch("https://hook.eu2.make.com/y4ohogsldw3jijjkzumub8vlkrt3b6kw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (webhookError) {
        console.error("Erreur envoi webhook (sauvegarde):", webhookError);
        // Ne pas afficher d'erreur à l'utilisateur car les données sont déjà enregistrées en base
      }

      toast.success("Commande envoyée avec succès !");
      
      // Si l'utilisateur n'est pas connecté, suggérer de créer un compte
      if (!user) {
        toast.info("Créez un compte pour suivre vos commandes", {
          description: "Un compte vous permettra de gérer facilement vos articles.",
          action: {
            label: "S'inscrire",
            onClick: () => navigate('/auth')
          }
        });
      } else {
        // Rediriger vers l'historique des commandes pour les utilisateurs connectés
        navigate('/orders-history');
      }
      
      // Reset form
      setPrenom("");
      setNom("");
      setEmail("");
      setEntreprise("");
      setSiteWeb("");
      setCategorie("");
      setContexte("");
      setSujet("");
      setObjectif("");
      setTon("");
      
    } catch (error) {
      console.error("Erreur générale:", error);
      toast.error("Erreur lors de l'envoi de la commande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Commander un article</h1>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Nouvelle commande</CardTitle>
          <CardDescription>Remplissez le formulaire ci-dessous pour commander un nouvel article.</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input 
                  id="prenom" 
                  value={prenom} 
                  onChange={(e) => setPrenom(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input 
                  id="nom" 
                  value={nom} 
                  onChange={(e) => setNom(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entreprise">Entreprise</Label>
                <Input 
                  id="entreprise" 
                  value={entreprise} 
                  onChange={(e) => setEntreprise(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_web">Site web</Label>
              <Input 
                id="site_web" 
                type="url" 
                value={site_web} 
                onChange={(e) => setSiteWeb(e.target.value)}
                placeholder="https://votresite.com" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categorie">Catégorie d'article</Label>
              <Select value={categorie} onValueChange={setCategorie} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="actualite">Actualité</SelectItem>
                  <SelectItem value="tutoriel">Tutoriel</SelectItem>
                  <SelectItem value="etude_cas">Étude de cas</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sujet">Sujet</Label>
              <Input 
                id="sujet" 
                value={sujet} 
                onChange={(e) => setSujet(e.target.value)} 
                required 
                placeholder="Sujet principal de l'article" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contexte">Contexte</Label>
              <Textarea 
                id="contexte" 
                value={contexte} 
                onChange={(e) => setContexte(e.target.value)} 
                placeholder="Fournissez le contexte pour cet article" 
                rows={4} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectif">Objectif</Label>
              <Textarea 
                id="objectif" 
                value={objectif} 
                onChange={(e) => setObjectif(e.target.value)} 
                placeholder="Quel est l'objectif de cet article?" 
                rows={4} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ton">Ton et style</Label>
              <Select value={ton} onValueChange={setTon}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un ton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formel">Formel</SelectItem>
                  <SelectItem value="professionnel">Professionnel</SelectItem>
                  <SelectItem value="conversationnel">Conversationnel</SelectItem>
                  <SelectItem value="amical">Amical</SelectItem>
                  <SelectItem value="humoristique">Humoristique</SelectItem>
                  <SelectItem value="autoritaire">Autoritaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Commander l'article"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Order;
