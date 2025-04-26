
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function ContextHelpSidebar({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className={`dark:bg-[#202837] border-zinc-200 dark:border-zinc-800 overflow-hidden ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:block">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
          <h3 className="text-base font-semibold">Besoin d'aide ?</h3>
          <CollapsibleTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent className="md:block">
          <CardContent className="p-4 pt-0">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2 text-sm">Exemples de briefs efficaces</h4>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <span className="text-[#0061E0]">•</span> 
                    <span>Définir clairement votre cible et votre objectif</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-[#0061E0]">•</span> 
                    <span>Préciser le ton adapté à votre audience</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-[#0061E0]">•</span> 
                    <span>Inclure des mots-clés ciblés et liens internes</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium mb-1 text-sm">Ressources SEO</h4>
                <div className="flex flex-col gap-1.5">
                  <a href="#" className="text-[#0061E0] hover:underline text-xs">Guide : Structure optimale d'un article</a>
                  <a href="#" className="text-[#0061E0] hover:underline text-xs">Les meilleures pratiques SEO 2024</a>
                  <a href="#" className="text-[#0061E0] hover:underline text-xs">Optimiser vos mots-clés</a>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <h4 className="font-medium mb-1 text-sm">FAQ</h4>
                <div className="flex flex-col gap-1.5 text-xs">
                  <a href="#" className="text-[#0061E0] hover:underline">Pourquoi certaines options sont grisées ?</a>
                  <a href="#" className="text-[#0061E0] hover:underline">Comment fonctionne la génération IA ?</a>
                  <a href="#" className="text-[#0061E0] hover:underline">Combien de temps pour recevoir mon article ?</a>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full text-[#0061E0] border-[#0061E0]/20 hover:bg-[#0061E0]/10">
                Contacter le support
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
