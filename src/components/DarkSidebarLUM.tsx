
import { NavLink } from "react-router-dom";
import { LayoutDashboard, List, ChartBar, Wallet, User, HelpCircle, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Logo from "./Logo";

const navItems = [
  { label: "Accueil", path: "/", icon: LayoutDashboard },
  { label: "Commandes", path: "/orders-history", icon: List },
  { label: "Articles", path: "/articles", icon: ChartBar },
  { label: "Analytics", path: "/analytics", icon: ChartBar },
  { label: "Factures", path: "/invoices", icon: Wallet },
  { label: "Mon Compte", path: "/account", icon: User },
  { label: "Support", path: "/support", icon: HelpCircle },
];

export default function DarkSidebarLUM({ activeSection }: { activeSection: string }) {
  const [dark, setDark] = useState(false);
  // Switch dark mode on/off
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-[#0A223C] text-white py-6 px-4 shadow-xl">
      <div className="flex flex-col items-center gap-4 mb-8">
        <Logo />
        <div className="flex flex-col items-center mt-2">
          <div className="bg-white text-[#0A223C] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl"> 
            <span>👤</span>
          </div>
          <div className="mt-1 text-xs font-semibold">Client Logo</div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition 
              ${activeSection === item.label ? "bg-[#0061E0] text-white shadow" : "hover:bg-white/10 text-white/80"}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4" />
          <span className="text-xs">Dark</span>
          <Switch checked={dark} onCheckedChange={setDark} />
        </div>
      </div>
    </aside>
  );
}
