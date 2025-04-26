
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { CheckCircle2, HelpCircle } from "lucide-react";

const Support = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler l'envoi
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Votre demande a été envoyée avec succès");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Support Technique</h1>
      <p className="text-muted-foreground mb-8">Besoin d'aide ? Notre équipe de support est là pour vous assister.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulaire de contact */}
        <div className="md:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-card-foreground">Contactez-nous</CardTitle>
              <CardDescription className="text-muted-foreground">
                Décrivez votre problème ou posez une question
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Nom</Label>
                      <Input id="name" placeholder="Votre nom" required className="dark-form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" required className="dark-form-input" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">Sujet</Label>
                    <Input id="subject" placeholder="Sujet de votre demande" required className="dark-form-input" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Décrivez votre problème en détail..." 
                      required 
                      className="min-h-[150px] dark-form-input" 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin rounded-full border-2 border-primary border-r-transparent h-4 w-4 mr-2" />
                        Envoi en cours...
                      </>
                    ) : "Envoyer ma demande"}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Demande envoyée !</h3>
                  <p className="text-muted-foreground max-w-md">
                    Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Envoyer une autre demande
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Informations de contact et FAQ */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-card-foreground">Informations de contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">Email de support</p>
                  <p className="text-muted-foreground">support@lum.ai</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Horaires</p>
                  <p className="text-muted-foreground">Lundi - Vendredi, 9h - 18h CET</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Temps de réponse</p>
                  <p className="text-muted-foreground">Moins de 24 heures ouvrées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <HelpCircle className="h-5 w-5" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Comment accéder à tous mes articles ?</p>
                  <p className="text-muted-foreground">Consultez la page "Articles" dans votre tableau de bord.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Comment changer mon forfait ?</p>
                  <p className="text-muted-foreground">Allez dans "Mon Compte" puis "Abonnement".</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" asChild className="w-full dark-button">
                    <a href="/faq">Voir toutes les FAQ</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
