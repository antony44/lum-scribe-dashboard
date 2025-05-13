
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard,
  FileText,
  ChartBar,
  User,
  HelpCircle,
  FileText as FileDocument,
  LifeBuoy,
  BookOpen,
  CreditCard,
  ShoppingCart
} from "lucide-react";

const navItems = [
  { label: "Tableau de Bord", path: "/", icon: LayoutDashboard },
  { label: "Créer un Article", path: "/order", icon: FileText },
  { label: "Analytics", path: "/analytics", icon: ChartBar },
  { label: "Mon Compte", path: "/account", icon: User },
  { label: "Test Checkout", path: "/test-checkout", icon: ShoppingCart },
  { label: "Plans & Tarifs", path: "/plans", icon: CreditCard },
  { label: "Factures", path: "/invoices", icon: FileDocument },
  { label: "FAQ", path: "/faq", icon: HelpCircle },
  { label: "Ressources", path: "/resources", icon: BookOpen },
  { label: "Support", path: "/support", icon: LifeBuoy },
];

interface NavigationItemsProps {
  activeSection?: string;
}

export function NavigationItems({ activeSection }: NavigationItemsProps) {
  return (
    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto no-scrollbar">
      {navItems.map((item) => (
        <NavLink
          key={item.path + item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-2.5 rounded-lg transition-all duration-200
            ${isActive || activeSection === item.label
              ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold' 
              : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`
          }
          end={item.path === "/"}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
