
import { Badge } from "@/components/ui/badge";
import React from "react";

/**
 * Dummy order data, replace with real API integration if needed.
 */
const orders = [
  {
    date: "13 mars 2022",
    title: "Allentac a Bouchin",
    bold: false,
    status: { text: "En cours", color: "bg-blue-100 text-blue-800" },
    type: "Article",
    seo: { score: 57, color: "bg-green-100 text-green-800" },
  },
  {
    date: "26 mars 2022",
    title: "Den de Atachofs",
    bold: true,
    status: { text: "Prêt", color: "bg-green-100 text-green-800" },
    type: "Article",
    seo: { score: 70, color: "bg-green-100 text-green-800" },
  },
  {
    date: "23 mai 2022",
    title: "Jullieria d cas",
    bold: true,
    status: { text: "Après", color: "bg-yellow-100 text-yellow-800" },
    type: "Article",
    seo: { score: 9, color: "bg-orange-100 text-orange-700" },
  },
  {
    date: "26 déc. 2022",
    title: "Titiet ale rarticle",
    bold: false,
    status: { text: "Évaluation", color: "bg-cyan-100 text-cyan-800" },
    type: "Article",
    seo: { score: 63, color: "bg-green-100 text-green-800" },
  },
  {
    date: "27 sept. 2022",
    title: "Eai: du Prédéges",
    bold: false,
    status: { text: "Prêt", color: "bg-green-100 text-green-800" },
    type: "Article",
    seo: { score: 60, color: "bg-green-100 text-green-800" },
  },
];

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-xl border shadow-sm mt-8 px-5 py-6 overflow-x-auto animate-fade-in">
      <div className="text-lg font-bold mb-4">Historique des commandes</div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-muted-foreground">
            <th className="py-2 px-3 font-medium">Date</th>
            <th className="py-2 px-3 font-medium">Titre</th>
            <th className="py-2 px-3 font-medium">Statut</th>
            <th className="py-2 px-3 font-medium">Type</th>
            <th className="py-2 px-3 font-medium">Score SEO</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((ord, i) => (
            <tr key={i} className="border-t">
              <td className="py-2 px-3 text-sm">{ord.date}</td>
              <td className={`py-2 px-3 font-${ord.bold ? "bold" : "normal"} text-sm`}>
                {ord.title}
              </td>
              <td className="py-2 px-3">
                <span className={`px-2 py-1 rounded font-medium text-xs ${ord.status.color}`}>
                  {ord.status.text}
                </span>
              </td>
              <td className="py-2 px-3 text-sm">{ord.type}</td>
              <td className="py-2 px-3">
                <span className={`px-2.5 py-1 rounded font-semibold text-xs ${ord.seo.color}`}>
                  {ord.seo.score}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
