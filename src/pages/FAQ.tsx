
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: "Général",
      items: [
        {
          question: "Comment fonctionne l'IA de LÜM ?",
          answer: "L'IA de LÜM analyse vos besoins et génère du contenu hautement qualitatif adapté à votre audience et à vos objectifs marketing."
        },
        {
          question: "Quelle est la différence entre les différents forfaits ?",
          answer: "Nos forfaits diffèrent par le nombre d'articles générables par mois, la longueur maximale des articles, et l'accès à des fonctionnalités premium comme les analyses avancées."
        },
        {
          question: "Puis-je annuler mon abonnement à tout moment ?",
          answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis la section 'Mon Compte'. Votre abonnement restera actif jusqu'à la fin de la période payée."
        }
      ]
    },
    {
      title: "Articles et Commandes",
      items: [
        {
          question: "Comment commander un article ?",
          answer: "Pour commander un article, rendez-vous sur la page 'Faire mon Article' et remplissez le formulaire de commande avec les détails demandés."
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
          question: "Combien de temps faut-il pour recevoir un article ?",
          answer: "La plupart des articles sont livrés en moins de 24 heures, selon la complexité et la longueur demandées."
        }
      ]
    },
    {
      title: "Technique",
      items: [
        {
          question: "Comment contacter le support technique ?",
          answer: "Vous pouvez contacter notre équipe de support via la page 'Support' ou par email à support@lum.ai."
        },
        {
          question: "Comment exporter mes articles ?",
          answer: "Vos articles peuvent être exportés en différents formats (PDF, Word, HTML) depuis la page 'Articles' en cliquant sur les options d'exportation."
        },
        {
          question: "Est-ce que LÜM fonctionne sur mobile ?",
          answer: "Oui, LÜM est entièrement compatible avec les appareils mobiles et tablettes, avec une interface adaptative."
        }
      ]
    },
    {
      title: "Facturation",
      items: [
        {
          question: "Comment puis-je mettre à jour mes informations de paiement ?",
          answer: "Vous pouvez mettre à jour vos informations de paiement dans la section 'Mon Compte' > 'Facturation'."
        },
        {
          question: "Comment obtenir une facture ?",
          answer: "Toutes vos factures sont automatiquement générées et disponibles dans la section 'Factures' de votre tableau de bord."
        }
      ]
    }
  ];

  // Filtre les FAQ en fonction du terme de recherche
  const filteredFAQ = searchTerm
    ? faqCategories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : faqCategories;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Foire Aux Questions</h1>
      <p className="text-muted-foreground mb-8">Trouvez les réponses aux questions les plus fréquemment posées.</p>
      
      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Rechercher dans les FAQ..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 dark-form-input"
        />
      </div>

      {filteredFAQ.length === 0 ? (
        <Card className="bg-card">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Aucun résultat trouvé pour "{searchTerm}".</p>
          </CardContent>
        </Card>
      ) : (
        filteredFAQ.map((category, catIndex) => (
          <Card key={catIndex} className="bg-card mb-8">
            <CardHeader>
              <CardTitle className="text-card-foreground">{category.title}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {category.items.length} question{category.items.length > 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${catIndex}-${index}`} 
                    className="border-border"
                  >
                    <AccordionTrigger className="text-card-foreground hover:text-card-foreground hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default FAQ;
