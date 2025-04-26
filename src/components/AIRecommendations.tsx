
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recommendations = [
  "Adressez-vous à un public plus large",
  "Rédigez un guide d'optimisation"
];

const performanceData = [
  { label: "Public plus large", value: 75 },
  { label: "Guide d'optimisation", value: 90 },
  { label: "Contenu technique", value: 45 }
];

const AIRecommendations = () => {
  return (
    <div className="space-y-6">
      {/* Recommendations */}
      <Card className="bg-white rounded-xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Recommandations IA éditoriales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Performance bars */}
      <Card className="bg-white rounded-xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Recommandations IA éditoriales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performanceData.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="text-gray-500">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item.value}%` }}
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
