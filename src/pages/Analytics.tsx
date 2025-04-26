
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer 
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import StatCard from "@/components/StatCard";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import BestArticles from "@/components/BestArticles";
import AIRecommendations from "@/components/AIRecommendations";

// Monthly orders data
const monthlyOrdersData = [
  { name: "J", orders: 20 },
  { name: "F", orders: 35 },
  { name: "M", orders: 25 },
  { name: "A", orders: 40 },
  { name: "M", orders: 30 },
  { name: "J", orders: 45 },
  { name: "J", orders: 55 },
  { name: "A", orders: 75 },
  { name: "S", orders: 65 },
  { name: "O", orders: 60 },
  { name: "N", orders: 70 },
  { name: "D", orders: 75 },
];

// Best performing articles
const bestArticles = [
  { id: 1, title: "Guide ultime SEO 2024" },
  { id: 2, title: "Tendances du marketing l'influence" },
  { id: 3, title: "Comment optimizer son contenu" }
];

const Analytics = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    // Simuler export
    setTimeout(() => {
      setLoading(false);
      toast.success("Export effectué !");
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Analytics</h1>
        <Button 
          onClick={handleExport} 
          className="bg-secondary hover:bg-muted text-secondary-foreground border border-border dark:bg-secondary dark:text-secondary-foreground"
          disabled={loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Exporter
        </Button>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard 
          value="1528" 
          label="Articles total"
          tooltip="Nombre total d'articles publiés"
        />
        
        <StatCard 
          value="84" 
          label="Commandes ce mois-ci" 
          trend="+12%"
          tooltip="Commandes du mois en cours"
        />
        
        <Card className="bg-card text-card-foreground rounded-xl border border-border shadow-sm dark:border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-card-foreground">
              Meilleur moment pour commander
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              Vous recevez plus de vues le mardi à 9 h
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Orders Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-card text-card-foreground rounded-xl border border-border shadow-sm dark:border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-card-foreground">
              Commandes mensuelles
            </CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ChartContainer
              config={{
                orders: {
                  label: "Commandes",
                  color: "#0061E0",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyOrdersData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0061E0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0061E0" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                  <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
                  <YAxis stroke="currentColor" fontSize={12} />
                  <RechartsTooltip 
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.375rem",
                      padding: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      color: "var(--card-foreground)"
                    }}
                    formatter={(value) => [`${value}`, 'Commandes']}
                    labelFormatter={(label) => `Mois: ${label}`}
                    itemStyle={{ color: "var(--card-foreground)" }}
                    labelStyle={{ color: "var(--card-foreground)" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#0061E0" 
                    fillOpacity={1} 
                    fill="url(#colorOrders)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <ActivityHeatmap />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BestArticles articles={bestArticles} />
        <AIRecommendations />
      </div>
    </div>
  );
};

export default Analytics;
