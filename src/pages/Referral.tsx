import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LumSidebar from "@/components/LumSidebar";
import TopBar from "@/components/TopBar";
import ReferralHero from "@/components/referral/ReferralHero";
import ReferralCode from "@/components/referral/ReferralCode";
import ReferralStats from "@/components/referral/ReferralStats";
import ReferralHistory from "@/components/referral/ReferralHistory";
import PromoCodeSection from "@/components/referral/PromoCodeSection";
import ContextHelpSidebar from "@/components/ContextHelpSidebar";

const Referral = () => {
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleShareSuccess = () => {
    toast({
      title: "Code copié !",
      description: "Votre code parrain est prêt à être partagé.",
    });
  };

  const handlePromoCreated = () => {
    toast({
      title: "Code promo créé avec succès !",
      description: "Votre nouveau code promo est maintenant actif.",
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FA] font-inter">
      <LumSidebar activeSection="Referral Program" />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 flex flex-row w-full px-4 md:px-8 py-4">
          <div className="flex-1 flex flex-col max-w-5xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Parrainage & Codes promo</h1>
            
            <section className="mb-8 animate-fade-in">
              <ReferralHero />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="md:col-span-2">
                  <ReferralCode onShare={handleShareSuccess} />
                </div>
                <div>
                  <ReferralStats />
                </div>
              </div>
              <ReferralHistory />
            </section>

            <section className="mb-8 animate-fade-in">
              <PromoCodeSection onPromoCreated={handlePromoCreated} />
            </section>

            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-50" id="confetti-container"></div>
            )}
          </div>
          
          <ContextHelpSidebar className="hidden lg:block ml-8" />
        </main>
      </div>
    </div>
  );
};

export default Referral;
