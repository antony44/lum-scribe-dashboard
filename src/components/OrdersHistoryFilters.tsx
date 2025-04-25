
import { useState } from "react";
import { Search, Filter, Download, Columns2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type OrdersHistoryFiltersProps = {
  view: "table" | "timeline";
  setView: (v: "table" | "timeline") => void;
};

export default function OrdersHistoryFilters({ view, setView }: OrdersHistoryFiltersProps) {
  const [search, setSearch] = useState("");

  function handleExport() {
    toast({ title: "Export en cours...", description: "Préparation du fichier selon vos filtres actifs." });
    setTimeout(() => {
      toast({ title: "Exporté avec succès !", description: "Vos données sont prêtes pour le téléchargement." });
    }, 1400);
  }
  return (
    <div className="flex flex-wrap gap-2 items-center mb-3">
      <div className="flex-1 min-w-[200px] flex items-center bg-white rounded-lg px-3 py-2 shadow border text-gray-900">
        <Search className="w-4 h-4 mr-2 text-muted-foreground" />
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-sm font-medium"
          placeholder="Rechercher…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleExport}
      ><Download className="w-4 h-4" />Exporter</Button>
      <Button
        variant={view === "timeline" ? "outline" : "default"}
        size="sm"
        className="gap-2"
        onClick={() => setView(view === "table" ? "timeline" : "table")}
      >
        {view === "table" ? (
          <>
            <Columns2 className="w-4 h-4" />Chronologie
          </>
        ) : (
          <>
            <List className="w-4 h-4" />Tableau
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" className="gap-2"><Filter className="w-4 h-4" />Statut</Button>
      <Button variant="outline" size="sm" className="gap-2">Catégorie</Button>
    </div>
  );
}
