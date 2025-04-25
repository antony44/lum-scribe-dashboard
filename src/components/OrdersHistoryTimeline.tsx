
import React from "react";
import { Loader } from "lucide-react";

export default function OrdersHistoryTimeline() {
  // Placeholder: affiche animation, heatmap discrète si pas de data
  return (
    <div className="flex flex-col items-center justify-center h-80 bg-white border rounded-xl shadow mt-2 animate-fade-in">
      <Loader className="w-10 h-10 text-blue-500 animate-spin mb-4" />
      <div className="text-lg font-semibold mb-1">Chronologie en développement</div>
      <div className="text-xs text-muted-foreground mb-4">
        La visualisation timeline arrive bientôt.<br />
        <span className="italic">Animée avec heatmap d’usage, IA, actions rapides…</span>
      </div>
      <img src="/lovable-uploads/7112ae98-a7eb-49f3-8c09-b4388444f886.png" alt="Référence wireframe" className="w-28 rounded-lg border" />
    </div>
  );
}
