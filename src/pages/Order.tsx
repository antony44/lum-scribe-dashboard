
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
        try {
          const { data, error } = await supabase
            .from('clients')
            .select('company_name')
            .eq('id_clients', user.id)
            .single();
          
          if (!error && data) {
            setEntreprise(data.company_name || '');
          }
        } catch (error) {
          console.error('Error fetching company name:', error);
        }
      }
    })();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Veuillez vous connecter pour commander un article");
      navigate('/auth');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update client's company name if changed
      const { error: clientError } = await supabase
        .from('clients')
        .upsert([
          {
            id_clients: user.id,
            company_name: entreprise,
          }
        ], { onConflict: 'id_clients' });
          
      if (clientError) {
        console.error('Erreur upsert clients:', clientError);
        toast.error('Impossible de mettre à jour votre profil');
        setIsSubmitting(false);
        return;
      }

      // Get client's plan
      const { data: planInfo, error: planError } = await supabase
        .from('clients')
        .select('plans_id')
        .eq('id_clients', user.id)
        .single();
          
      if (planError) {
        console.error('Erreur récupération plan client:', planError);
        toast.error('Impossible de récupérer votre plan');
        setIsSubmitting(false);
        return;
      }
      
      // Changed from const to let since we need to reassign it later
      let planId = planInfo?.plans_id;

      if (!planId) {
        // Get default plan as fallback
        const { data: defaultPlan, error: defaultPlanError } = await supabase
          .from('plans')
          .select('id_plans')
          .eq('nom', 'Basic')
          .limit(1)
          .single();
          
        if (defaultPlanError) {
          console.error('Erreur récupération plan par défaut:', defaultPlanError);
          toast.error('Impossible de récupérer le plan par défaut');
          setIsSubmitting(false);
          return;
        }
        
        planId = defaultPlan?.id_plans;
      }

      // Create commande
      const { error: commandeError } = await supabase
        .from('commandes')
        .insert([
          {
            clients_id: user.id,
            company_name: entreprise, 
            lien_blog_site: siteWeb, 
            categorie, 
            contexte, 
            sujet, 
            objectif, 
            ton, 
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
      navigate('/orders-history');

      // Reset form
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

  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Connectez-vous pour commander</CardTitle>
            <CardDescription>Vous devez être connecté pour commander un article.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="mb-6 text-center">Veuillez vous connecter ou créer un compte pour commander un article.</p>
            <Button onClick={() => navigate('/auth')}>
              Se connecter / S'inscrire
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div>
              <Label htmlFor="entreprise">Entreprise</Label>
              <Input id="entreprise" value={entreprise} onChange={e => setEntreprise(e.target.value)} />
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
