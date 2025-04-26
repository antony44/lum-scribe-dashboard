
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Comment commander un article ?",
      answer: "Pour commander un article, rendez-vous sur la page 'Faire mon Article' et remplissez le formulaire de commande avec les détails demandés."
    },
    {
      question: "Comment fonctionne l'IA de LÜM ?",
      answer: "L'IA de LÜM analyse vos besoins et génère du contenu hautement qualitatif adapté à votre audience et à vos objectifs marketing."
    },
    {
      question: "Combien d'articles puis-je commander par mois ?",
      answer: "Le nombre d'articles dépend de votre forfait. Consultez votre quota restant sur votre tableau de bord."
    },
    {
      question: "Est-il possible de modifier un article après livraison ?",
      answer: "Oui, vous pouvez demander des ajustements dans les 7 jours suivant la livraison de votre article."
    },
    {
      question: "Comment contacter le support technique ?",
      answer: "Vous pouvez contacter notre équipe de support via la page 'Support' ou par email à support@lum.ai."
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Foire Aux Questions</h1>
      <p className="text-muted-foreground mb-8">Trouvez les réponses aux questions les plus fréquemment posées.</p>
      
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Questions fréquentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-card-foreground">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;
