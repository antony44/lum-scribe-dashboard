
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Resources = () => {
  return (
    <div className="h-full w-full bg-background dark:bg-[#161C24] font-inter flex flex-col items-stretch">
      <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          Ressources
        </h1>
        <div className="h-1 w-28 bg-[#0061E0] rounded-full mb-8" />
        
        <Tabs defaultValue="guides">
          <TabsList className="mb-6">
            <TabsTrigger value="guides">Guides SEO</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriels</TabsTrigger>
            <TabsTrigger value="examples">Exemples</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guides SEO</CardTitle>
                <CardDescription>
                  Optimisez votre contenu avec nos guides SEO experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    <ResourceCard 
                      title="Structure optimale d'un article" 
                      description="Découvrez comment structurer vos articles pour maximiser leur impact SEO et l'expérience utilisateur."
                      author="Équipe LÜM"
                      date="12 Avril 2025"
                      readTime="8 min"
                    />
                    
                    <ResourceCard 
                      title="Les meilleures pratiques SEO 2025" 
                      description="Un guide complet des techniques SEO les plus efficaces pour cette année, incluant les dernières mises à jour des algorithmes."
                      author="Équipe LÜM"
                      date="3 Mars 2025"
                      readTime="12 min"
                    />
                    
                    <ResourceCard 
                      title="Optimisation des mots-clés" 
                      description="Comment rechercher et implémenter efficacement des mots-clés pertinents dans votre contenu."
                      author="Équipe LÜM"
                      date="25 Février 2025"
                      readTime="6 min"
                    />
                    
                    <ResourceCard 
                      title="Balises méta et SEO technique" 
                      description="Guide détaillé sur l'optimisation des balises méta, des URL et des aspects techniques du SEO."
                      author="Équipe LÜM"
                      date="18 Février 2025"
                      readTime="9 min"
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tutoriels</CardTitle>
                <CardDescription>
                  Apprenez à utiliser toutes les fonctionnalités de LÜM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    <ResourceCard 
                      title="Créer un brief parfait avec LÜM" 
                      description="Apprenez à formuler des briefs qui génèrent des articles de grande qualité."
                      author="Support LÜM"
                      date="15 Avril 2025"
                      readTime="7 min"
                    />
                    
                    <ResourceCard 
                      title="Utiliser l'IA pour générer du contenu" 
                      description="Guide pas à pas pour exploiter pleinement nos outils d'IA."
                      author="Support LÜM"
                      date="10 Avril 2025"
                      readTime="10 min"
                    />
                    
                    <ResourceCard 
                      title="Analyser vos performances SEO" 
                      description="Comment interpréter les métriques et améliorer continuellement vos contenus."
                      author="Support LÜM"
                      date="5 Avril 2025"
                      readTime="8 min"
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exemples</CardTitle>
                <CardDescription>
                  Exemples de contenus générés avec LÜM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    <ResourceCard 
                      title="Article pilier sur le marketing digital" 
                      description="Un exemple d'article approfondi couvrant plusieurs aspects du marketing digital."
                      author="Équipe LÜM"
                      date="20 Avril 2025"
                      readTime="5 min"
                    />
                    
                    <ResourceCard 
                      title="Checklist SEO complète" 
                      description="Exemple de checklist détaillée pour l'audit SEO d'un site web."
                      author="Équipe LÜM"
                      date="15 Avril 2025"
                      readTime="4 min"
                    />
                    
                    <ResourceCard 
                      title="FAQ sur l'intelligence artificielle" 
                      description="Un exemple de FAQ bien structurée sur l'IA et ses applications business."
                      author="Équipe LÜM"
                      date="10 Avril 2025"
                      readTime="3 min"
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
                <CardDescription>
                  Réponses aux questions les plus posées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    <FAQItem 
                      question="Comment fonctionne la génération IA ?" 
                      answer="Notre IA analyse votre brief et le contexte pour créer un contenu sur mesure. Elle s'appuie sur des données structurées et les meilleures pratiques SEO pour générer un article optimisé pour votre audience et les moteurs de recherche."
                    />
                    
                    <FAQItem 
                      question="Pourquoi certaines options sont grisées ?" 
                      answer="Ces fonctionnalités sont disponibles dans les forfaits supérieurs. Les options comme le choix de ton ou les types de contenus avancés sont réservées aux forfaits Pro, Avancé ou Expert pour garantir une expérience premium."
                    />
                    
                    <FAQItem 
                      question="Combien de temps pour recevoir mon article ?" 
                      answer="La plupart des articles sont livrés sous 48 heures. Les articles plus complexes ou lors de périodes de forte demande peuvent prendre jusqu'à 72 heures. Vous recevrez une notification dès que votre contenu sera prêt."
                    />
                    
                    <FAQItem 
                      question="Puis-je modifier mon article après réception ?" 
                      answer="Absolument. Vous pouvez demander jusqu'à 3 révisions gratuites dans les 7 jours suivant la réception de votre article. Notre équipe traitera vos demandes de modification rapidement."
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
}

const ResourceCard = ({ title, description, author, date, readTime }: ResourceCardProps) => {
  return (
    <div className="p-4 rounded-lg border border-border dark:border-zinc-800 bg-card dark:bg-[#202837] hover:shadow-md transition-all duration-200">
      <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{readTime} de lecture</span>
          <Link 
            to="#" 
            className="flex items-center gap-1 text-xs font-medium text-[#0061E0] hover:underline"
          >
            Lire <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-foreground">{question}</h3>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
};

export default Resources;
