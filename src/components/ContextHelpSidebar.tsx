
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContextHelpSidebar({ className = "" }: { className?: string }) {
  return (
    <Card className={`w-full lg:w-64 shadow p-0 border transition-colors ${className}`}>
      <CardContent className="p-5 space-y-5">
        <div>
          <h3 className="text-base font-semibold mb-3">Besoin d'aide ?</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="text-[#0061E0] hover:underline block"
              tabIndex={0}
            >
              Exemple de brief efficace
            </a>
            <a
              href="#"
              className="text-[#0061E0] hover:underline block"
              tabIndex={0}
            >
              Bonnes pratiques SEO
            </a>
            <a
              href="#"
              className="text-[#0061E0] hover:underline block"
              tabIndex={0}
            >
              Contacter le support
            </a>
          </div>
        </div>

        <div className="border-t dark:border-[#202837] pt-4">
          <h3 className="text-base font-semibold mb-2">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                Pourquoi certains champs sont grisés ?
              </Button>
            </li>
            <li>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                Combien de temps pour recevoir mon article ?
              </Button>
            </li>
            <li>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                Comment définir le bon ton rédactionnel ?
              </Button>
            </li>
            <li>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                Puis-je demander des modifications ?
              </Button>
            </li>
          </ul>
        </div>

        <div className="border-t dark:border-[#202837] pt-4">
          <h3 className="text-base font-semibold mb-2">Astuces</h3>
          <p className="text-sm text-muted-foreground">
            Les articles avec un objectif clair et un contexte détaillé sont produits plus rapidement et avec une meilleure qualité.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
