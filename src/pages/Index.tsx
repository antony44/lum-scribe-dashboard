
import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import QuotaCircle from "@/components/QuotaCircle";
import OrdersTable from "@/components/OrdersTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const PRENOM = "Clara";
const PLAN = "Plan Pro";
const ARTICLES_RESTANT = 2;
const QUOTA_POURCENT = 20;
const ARTICLES_GEN = 52;
const PERF = 96;

export default function Index() {
  const [loading, setLoading] = useState(false);

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Nouvelle commande",
        description: "Votre nouvelle commande a été démarrée avec succès !",
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background font-inter">
      <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 px-2 lg:px-8 py-4 w-full animate-fade-in">
        {/* Left: Welcome + stats + CTA */}
        <div className="flex-1 min-w-0">
          {/* Welcome card */}
          <div className="bg-card rounded-xl border shadow-sm px-6 py-5 mb-6 flex flex-col gap-1">
            <div className="text-2xl font-semibold mb-2 flex items-center">
              <span className="mr-2 text-2xl">👋</span>
              <span>Bonjour {PRENOM}&nbsp;!</span>
            </div>
            <div className="text-gray-600 dark:text-gray-300 mb-2">
              Il vous reste <span className="font-semibold text-blue-600 dark:text-blue-400">{ARTICLES_RESTANT} articles</span> sur le plan <span className="font-semibold">{PLAN}</span>.<br />
              Passez au niveau supérieur pour plus de contenu !
            </div>
            {/* Stats cards */}
            <div className="flex flex-col xs:flex-row gap-3 my-3">
              <StatCard
                value={ARTICLES_GEN}
                label="articles générés"
                tooltip="Nombre total d'articles créés grâce à LÜM."
                trend="↑96 %"
              />
              <StatCard
                value={QUOTA_POURCENT + " %"}
                label="% du quota utilisé"
                tooltip="Pourcentage d'utilisation de votre quota mensuel."
              />
              <StatCard
                value={PERF + " %"}
                label="Performance éditoriale"
                badge="Excellente"
                tooltip="La qualité des articles selon l'équipe éditoriale."
              />
            </div>
            <Button
              onClick={handleOrder}
              className="w-full lg:w-auto mt-4 text-base py-3"
              disabled={loading}
              variant="default"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full border-2 border-blue-600 border-r-transparent h-4 w-4 inline-block" /> 
                  Chargement...
                </span>
              ) : (
                <>COMMANDER UN NOUVEL ARTICLE</>
              )}
            </Button>
          </div>
        </div>

        {/* Right: Quota progress circle */}
        <div className="w-full md:w-auto flex justify-center items-center">
          <QuotaCircle percent={QUOTA_POURCENT} />
        </div>
      </div>

      {/* Table: Historique des commandes */}
      <div className="px-2 lg:px-8 pb-10 w-full">
        <OrdersTable />
      </div>
    </div>
  );
}
