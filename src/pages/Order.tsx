
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [categorie, setCategorie] = useState('');
  const [contexte, setContexte] = useState('');
  const [sujet, setSujet] = useState('');
  const [objectif, setObjectif] = useState('');
  const [ton, setTon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data if authenticated
  useEffect(() => {
    (async () => {
      if (user) {
        setEmail(user.email || '');
        const { data, error } = await supabase
          .from('Clients')
          .select('first_name, last_name, company_name')
          .eq('id_clients', user.id)
          .single();
        
        if (!error && data) {
          setPrenom(data.first_name || '');
          setNom(data.last_name || '');
          setEntreprise(data.company_name || '');
        }
      }
    })();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let clientId = user?.id;

      // If user is authenticated, update their client record
      if (user) {
        const { error: clientError } = await supabase
          .from('Clients')
          .upsert([
            {
              id_clients: user.id,
              first_name: prenom,
              last_name: nom,
              email,
              company_name: entreprise,
            }
          ], { onConflict: 'id_clients' });
          
        if (clientError) {
          console.error('Erreur upsert clients:', clientError);
          toast.error('Impossible de mettre à jour votre profil');
          setIsSubmitting(false);
          return;
        }
      } 
      // If user is not authenticated, create a new client
      else {
        // Get default plan
        const { data: planData, error: planError } = await supabase
          .from('Plans')
          .select('id_plans')
          .eq('nom', 'Basic')
          .limit(1)
          .single();
          
        if (planError) {
          console.error('Erreur récupération plan par défaut:', planError);
          toast.error('Impossible de récupérer le plan par défaut');
          setIsSubmitting(false);
          return;
        }
        
        const defaultPlanId = planData?.id_plans;

        // Create new client
        const { data: clientData, error: insertClientError } = await supabase
          .from('Clients')
          .insert([
            {
              first_name: prenom,
              last_name: nom,
              email,
              plans_id: defaultPlanId,
              company_name: entreprise,
            }
          ])
          .select('id_clients');
          
        if (insertClientError) {
          console.error('Erreur création client:', insertClientError);
          toast.error('Impossible de créer le client');
          setIsSubmitting(false);
          return;
        }
        
        clientId = clientData?.[0]?.id_clients;
      }

      if (!clientId) {
        toast.error('Identifiant client introuvable');
        setIsSubmitting(false);
        return;
      }

      // Get client's plan
      let planId;
      if (user) {
        const { data: planInfo, error: planError } = await supabase
          .from('Clients')
          .select('plans_id')
          .eq('id_clients', user.id)
          .single();
          
        if (planError) {
          console.error('Erreur récupération plan client:', planError);
          // Continue with default plan if error
        } else {
          planId = planInfo?.plans_id;
        }
      }

      if (!planId) {
        // Get default plan as fallback
        const { data: defaultPlan } = await supabase
          .from('Plans')
          .select('id_plans')
          .eq('nom', 'Basic')
          .limit(1)
          .single();
          
        planId = defaultPlan?.id_plans;
      }

      // Create commande
      const { error: commandeError } = await supabase
        .from('Commandes')
        .insert([
          {
            clients_id: clientId,
            company_name: entreprise, // Save company name directly
            lien_blog_site: siteWeb, // Save website directly
            categorie, // Save category directly
            contexte, // Save context directly
            sujet, // Save subject directly
            objectif, // Save objective directly
            ton, // Save tone directly
            statut: 'nouvelle',
            plans_id: planId,
          }
        ]);
        
      if (commandeError) {
        console.error('Erreur création commande:', commandeError);
        toast.error('Impossible de créer la commande');
        setIsSubmitting(false);
        return;
      }

      toast.success('Commande créée avec succès !');
      
      // Redirect authenticated users to orders history, others to auth
      navigate(user ? '/orders-history' : '/auth');

      // Reset form
      setPrenom(''); 
      setNom(''); 
      setEmail(''); 
      setEntreprise('');
      setSiteWeb(''); 
      setCategorie(''); 
      setContexte(''); 
      setSujet('');
      setObjectif(''); 
      setTon('');
      
    } catch (err) {
      console.error('Erreur commande:', err);
      toast.error('Erreur inattendue');
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
          <CardDescription>Remplissez le formulaire pour commander un nouvel article.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={prenom} onChange={e => setPrenom(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={nom} onChange={e => setNom(e.target.value)} required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="entreprise">Entreprise</Label>
                <Input id="entreprise" value={entreprise} onChange={e => setEntreprise(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="siteWeb">Site web</Label>
              <Input id="siteWeb" type="url" value={siteWeb} onChange={e => setSiteWeb(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="categorie">Catégorie</Label>
              <Select value={categorie} onValueChange={setCategorie} required>
                <SelectTrigger><SelectValue placeholder="Choisir..."/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sujet">Sujet</Label>
              <Input id="sujet" value={sujet} onChange={e => setSujet(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="contexte">Contexte</Label>
              <Textarea id="contexte" value={contexte} onChange={e => setContexte(e.target.value)} rows={4} />
            </div>
            <div>
              <Label htmlFor="objectif">Objectif</Label>
              <Textarea id="objectif" value={objectif} onChange={e => setObjectif(e.target.value)} rows={4} required />
            </div>
            <div>
              <Label htmlFor="ton">Ton</Label>
              <Select value={ton} onValueChange={setTon}>
                <SelectTrigger><SelectValue placeholder="Ton..."/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="formel">Formel</SelectItem>
                  <SelectItem value="humoristique">Humoristique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi...' : "Commander l'article"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
