
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const referralData = [
  { date: '24 avr. 2025', code: 'PARRAIN-JL', filleul: 'martin@exemple.com', montant: '20€', statut: 'Payé', isTop: true },
  { date: '15 avr. 2025', code: 'PARRAIN-JL', filleul: 'julie@exemple.com', montant: '14€', statut: 'À venir', isTop: false },
  { date: '28 mars 2025', code: 'PARRAIN-JL', filleul: 'thomas@exemple.com', montant: '8€', statut: 'Payé', isTop: false },
];

const ReferralHistory = () => {
  return (
    <Card className="mt-6 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg">Historique de parrainage</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Code utilisé</TableHead>
              <TableHead>Filleul</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referralData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.filleul}</TableCell>
                <TableCell className="font-medium">{item.montant}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className={item.statut === 'Payé' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}>
                      {item.statut}
                    </Badge>
                    {item.isTop && (
                      <Badge className="bg-blue-100 text-blue-800">Top Parrain</Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReferralHistory;
