
import React from "react";

export default function ContextHelpSidebar({ className = "" }: { className?: string }) {
  return (
    <aside className={`w-64 dark-mode-card rounded-xl shadow p-4 border h-fit min-h-[160px] ${className}`}>
      <div className="text-sm font-semibold mb-2 text-foreground">Aucun article ? Proposez d'en commander un.</div>
      <a href="#" className="text-primary underline hover:opacity-80 text-sm">Besoin d'aide ?</a>
      <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
        <li>• Comment relancer un article ?</li>
        <li>• Exporter en 1 clic</li>
        <li>• FAQ : suivi et feedback</li>
      </ul>
    </aside>
  );
}
