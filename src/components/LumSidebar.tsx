
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home,
  FileText,
  ChartBar,
  User,
  HelpCircle,
  Moon,
  Sun,
  Bell,
  FileText2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import Logo from "./Logo";

const navItems = [
  { label: "Accueil", path: "/", icon: Home },
  { label: "Faire mon Article", path: "/order", icon: FileText },
  { label: "Analytics", path: "/analytics", icon: ChartBar },
  { label: "Mon Compte", path: "/account", icon: User },
  { label: "Factures", path: "/invoices", icon: FileText2 },
  { label: "FAQ", path: "/support", icon: HelpCircle },
  { label: "Support", path: "/support", icon: HelpCircle },
];

export default function LumSidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasNotifications] = useState(true);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg md:hidden"
        aria-label="Toggle Menu"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-[#121C2D] text-white transition-transform duration-300 ease-in-out z-40
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 flex items-center">
            <Logo />
            <span className="ml-2 font-black text-xl tracking-tighter">LÜM</span>
          </div>

          {/* User Profile Section */}
          <div className="px-4 py-2 flex items-center space-x-3 border-b border-white/10">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatar.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-white/70">Premium</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path + item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-[#0061E0] font-semibold' 
                    : 'hover:bg-white/10'}`
                }
                end={item.path === "/"}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                {item.label === "Mon Compte" && hasNotifications && (
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-[#B91226]" />
                )}
              </NavLink>
            ))}

            <button 
              className="w-full flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => {}}
            >
              <Bell className="w-5 h-5 mr-3" />
              <span>Notifications</span>
              {hasNotifications && (
                <span className="ml-auto flex h-2 w-2 rounded-full bg-[#B91226]" />
              )}
            </button>
          </nav>

          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-sm">Mode sombre</span>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

