
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import DarkSidebarLUM from "@/components/DarkSidebarLUM";
import TopBar from "@/components/TopBar";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
    // Simulate export
    setTimeout(() => {
      setLoading(false);
      toast.success("Export effectué !");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      <DarkSidebarLUM activeSection="Analytics" />
      <div className="flex-1">
        <TopBar />
        
        <main className="container mx-auto p-6 animate-fade-in">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">Analytics</h1>
            <Button 
              onClick={handleExport} 
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
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
            
            <Card className="bg-white rounded-xl border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Meilleur moment pour commander
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Vous recevez plus de vues le mardi à 9 h
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Orders Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white rounded-xl border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <ChartTooltip 
                        content={props => (
                          <ChartTooltipContent {...props} />
                        )} 
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
        </main>
      </div>
    </div>
  );
};

export default Analytics;
