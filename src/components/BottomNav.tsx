
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  List,
  ChartBar,
  Wallet,
  Users,
  User,
  Settings,
} from "lucide-react";

// Only include the most important tabs for mobile; can add others as needed.
const mobileNav = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Order", path: "/order", icon: FilePlus },
  { label: "Articles", path: "/articles", icon: List },
  { label: "Analytics", path: "/analytics", icon: ChartBar },
  { label: "Profile", path: "/account", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background border-t border-border z-50 flex justify-between">
      {mobileNav.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 py-2 text-xs transition ${
              isActive ? "text-primary font-bold" : "text-muted-foreground"
            }`
          }
        >
          <item.icon className="w-5 h-5 mb-0.5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
