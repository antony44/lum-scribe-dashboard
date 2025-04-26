
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Article {
  id: number;
  title: string;
}

interface BestArticlesProps {
  articles: Article[];
}

const BestArticles = ({ articles }: BestArticlesProps) => {
  return (
    <Card className="bg-white rounded-xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Articles les plus performants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="flex items-start">
              <span className="text-lg font-bold text-blue-600 mr-2">
                {article.id}
              </span>
              <span className="font-medium">{article.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BestArticles;
