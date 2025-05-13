
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionne la facturation ?",
    answer: "La facturation est effectuée mensuellement ou annuellement selon le cycle que vous choisissez. Vous pouvez modifier votre plan à tout moment depuis votre espace client."
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace client. Votre abonnement restera actif jusqu'à la fin de la période en cours."
  },
  {
    question: "Comment sont calculés les articles dans mon forfait ?",
    answer: "Chaque plan vous donne accès à un certain nombre d'articles par mois. Ces articles sont réinitialisés chaque mois et ne se cumulent pas d'un mois à l'autre."
  },
  {
    question: "Y a-t-il une période d'essai ?",
    answer: "Oui, le plan Basic est gratuit et vous permet de tester nos services avec un article par mois. Vous pouvez passer à un plan supérieur à tout moment."
  },
  {
    question: "Puis-je passer à un plan supérieur en cours d'abonnement ?",
    answer: "Oui, vous pouvez passer à un plan supérieur à tout moment. La différence de prix sera calculée au prorata du temps restant sur votre abonnement actuel."
  },
  {
    question: "Comment sont protégées mes données de paiement ?",
    answer: "Nous utilisons Stripe, un service de paiement sécurisé, pour traiter toutes les transactions. Vos informations de paiement sont cryptées et ne sont jamais stockées sur nos serveurs."
  }
];

const PricingFAQ: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PricingFAQ;
