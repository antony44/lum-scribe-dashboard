
import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const Order = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Insérer ou mettre à jour les données dans la table Clients
      const { data: clientData, error: clientError } = await supabase
        .from('Clients')
        .upsert({
          first_name: prenom,
          last_name: nom,
          email: email,
          // Nous utilisons les valeurs par défaut pour les autres champs
        }, { onConflict: 'email' })
        .select('id_clients');

      if (clientError) {
        console.error("Erreur lors de la création du client:", clientError);
        toast.error("Erreur lors de la création du client.");
        setIsSubmitting(false);
        return;
      }

      // Récupération de l'ID client
      const clientId = clientData?.[0]?.id_clients;
      
      if (!clientId) {
        console.error("Impossible de récupérer l'ID client");
        toast.error("Erreur lors du traitement de la commande.");
        setIsSubmitting(false);
        return;
      }

      // 2. Insérer les données dans la table Commandes
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

      // Si l'insertion a réussi, nous envoyons également au webhook comme avant
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

      const webhookResponse = await fetch("https://hook.eu2.make.com/y4ohogsldw3jijjkzumub8vlkrt3b6kw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (webhookResponse.ok) {
        toast.success("Commande envoyée avec succès !");
        // Reset form after successful submission
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
      } else {
        toast.warning("La commande a été enregistrée mais l'envoi au webhook a échoué.");
      }
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
