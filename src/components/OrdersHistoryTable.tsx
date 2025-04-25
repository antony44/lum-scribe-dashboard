
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { CircleCheck, CircleDot, CircleX, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { useState } from "react";

const ORDERS = [
  {
    date: "18 avr. 2022",
    title: "Article 1",
    status: "Prêt",
    statusColor: "bg-green-500",
    statusIcon: CircleCheck,
    type: "Marketing",
    score: 82,
    scoreColor: "bg-green-100 text-green-900",
  },
  {
    date: "23 juil. 2022",
    title: "Article 2",
    status: "En cours",
    statusColor: "bg-blue-500",
    statusIcon: CircleDot,
    type: "Actu",
    score: 67,
    scoreColor: "bg-blue-100 text-blue-900",
  },
  {
    date: "10 juil. 2022",
    title: "Article 3",
    status: "Bientôt",
    statusColor: "bg-red-500",
    statusIcon: CircleX,
    type: "Journal",
    score: 56,
    scoreColor: "bg-red-100 text-red-900",
  },
  {
    date: "15 juil. 2022",
    title: "Article 4",
    status: "Juré",
    statusColor: "bg-gray-500",
    statusIcon: CircleDot,
    type: "Mars",
    score: 47,
    scoreColor: "bg-green-100 text-green-900",
  },
  {
    date: "24 juil. 2022",
    title: "Article 5",
    status: "Réconté",
    statusColor: "bg-blue-500",
    statusIcon: CircleDot,
    type: "Semaine",
    score: 32,
    scoreColor: "bg-gray-100 text-gray-900",
  },
  {
    date: "12 mai 2022",
    title: "Article 6",
    status: "En tours",
    statusColor: "bg-yellow-500",
    statusIcon: CircleDot,
    type: "Savà",
    score: 83,
    scoreColor: "bg-green-100 text-green-900",
  },
];

export default function OrdersHistoryTable() {
  const [selected, setSelected] = useState<number[]>([]);

  function onAction(action: string, i: number) {
    toast({ title: `Action “${action}”`, description: `Pour ${ORDERS[i].title}` });
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border mt-2 animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="sticky top-0 bg-white z-10">
            <TableHead className="w-10 px-3"></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Score
                <Tooltip>
                  <span>
                    <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                  </span>
                  <span className="bg-white text-xs p-2 rounded shadow border">Performance IA/SEO/retour client</span>
                </Tooltip>
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ORDERS.map((order, i) => (
            <TableRow key={i} className="group hover:bg-gray-50 transition">
              <TableCell>
                <input
                  type="checkbox"
                  checked={selected.includes(i)}
                  onChange={() => setSelected((s) => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}
                  aria-label="Sélectionner la commande" className="accent-blue-500"
                />
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="font-medium group-hover:text-primary transition">{order.title}</TableCell>
              <TableCell>
                <span className={`flex gap-1 items-center ${order.statusColor} rounded-full px-2 py-0.5 text-xs font-semibold`}>
                  <order.statusIcon className="w-3 h-3 mr-1" />
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${order.scoreColor}`}>{order.score}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" title="Voir" onClick={() => onAction("Voir", i)}>
                    <span className="sr-only">Voir</span>▶️
                  </Button>
                  <Button variant="ghost" size="icon" title="Recommander" onClick={() => onAction("Recommander", i)}>
                    <span className="sr-only">Recommander</span>🔁
                  </Button>
                  <Button variant="ghost" size="icon" title="Télécharger" onClick={() => onAction("Télécharger", i)}>
                    <span className="sr-only">Télécharger</span>⬇️
                  </Button>
                  <Button variant="ghost" size="icon" title="Feedback" onClick={() => onAction("Feedback", i)}>
                    <span className="sr-only">Feedback</span>💬
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
