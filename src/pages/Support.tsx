
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone } from "lucide-react";

const Support = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Support & Assistance</h1>
      <p className="text-muted-foreground mb-8">Besoin d'aide ? Notre équipe est disponible pour vous accompagner.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card">
          <CardHeader>
            <Mail className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
            <CardTitle>Email</CardTitle>
            <CardDescription>Réponse sous 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">support@lum.ai</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader>
            <MessageCircle className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
            <CardTitle>Chat</CardTitle>
            <CardDescription>Disponible 7j/7</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">Cliquez sur le bouton ci-dessous</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Ouvrir le chat</Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-card">
          <CardHeader>
            <Phone className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
            <CardTitle>Téléphone</CardTitle>
            <CardDescription>Lun-Ven, 9h-18h</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">+33 (0)1 23 45 67 89</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Contactez-nous</CardTitle>
          <CardDescription>Envoyez-nous un message et nous vous répondrons dans les plus brefs délais</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Nom</label>
                <Input id="name" placeholder="Votre nom" className="bg-background text-foreground" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <Input id="email" type="email" placeholder="Votre email" className="bg-background text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">Sujet</label>
              <Input id="subject" placeholder="Sujet de votre message" className="bg-background text-foreground" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
              <Textarea id="message" placeholder="Détaillez votre problème ou votre question..." className="min-h-[150px] bg-background text-foreground" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Envoyer</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Support;
