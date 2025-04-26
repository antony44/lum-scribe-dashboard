
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Linkedin, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralCodeProps {
  onShare: () => void;
}

const ReferralCode: React.FC<ReferralCodeProps> = ({ onShare }) => {
  const [referralCode, setReferralCode] = useState("PARRAIN-JL");
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Code copié !",
      description: "Le code a été copié dans votre presse-papier."
    });
    onShare();
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://lum.app/parrainage?code=" + referralCode)}`;
    window.open(url, "_blank");
    onShare();
  };

  const toggleQR = () => {
    setShowQR(!showQR);
    if (!showQR) {
      toast({
        title: "QR Code généré",
        description: "Scannez ce code pour partager."
      });
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Votre code parrain</h3>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">-10% sur le 1er achat</Badge>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex gap-2 mb-4">
              <Input 
                value={referralCode} 
                onChange={(e) => setReferralCode(e.target.value)} 
                className="text-lg font-medium"
              />
              <Button onClick={copyCode} className="flex items-center gap-2">
                <Copy className="h-4 w-4" /> Copier
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={copyCode} 
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <Share2 className="h-4 w-4" /> Partager
              </Button>
              <Button 
                variant="outline" 
                onClick={shareToLinkedIn} 
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Button>
              <Button 
                variant="outline" 
                onClick={toggleQR} 
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <QrCode className="h-4 w-4" /> QR Code
              </Button>
            </div>
          </div>

          {showQR && (
            <div className="flex flex-col items-center">
              <div className="bg-white p-2 border rounded-md mb-2">
                <img 
                  src="/lovable-uploads/cacf5acc-595a-47e4-9c70-afa588bf5e3c.png" 
                  alt="QR Code" 
                  className="w-24 h-24"
                />
              </div>
              <span className="text-xs text-muted-foreground">https://lum.app/r/{referralCode}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Récompense versée sous 30 jours après l'achat qualifié de votre filleul.
        </p>
      </CardContent>
    </Card>
  );
};

export default ReferralCode;
