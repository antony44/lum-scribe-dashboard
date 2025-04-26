
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
  FileText as FileDocument,
  X,
  Check,
  LifeBuoy,
  BookOpen
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const navItems = [
  { label: "Accueil", path: "/", icon: Home },
  { label: "Faire mon Article", path: "/order", icon: FileText },
  { label: "Analytics", path: "/analytics", icon: ChartBar },
  { label: "Mon Compte", path: "/account", icon: User },
  { label: "Factures", path: "/invoices", icon: FileDocument },
  { label: "FAQ", path: "/faq", icon: HelpCircle },
  { label: "Ressources", path: "/resources", icon: BookOpen },
  { label: "Support", path: "/support", icon: LifeBuoy },
];

// Données de démonstration pour les notifications
const notificationsData = [
  { id: 1, read: false, title: "Votre article est prêt", description: "Article sur le marketing digital terminé", time: "Il y a 15 min" },
  { id: 2, read: false, title: "Mise à jour de LÜM", description: "Découvrez les nouvelles fonctionnalités", time: "Il y a 2h" },
  { id: 3, read: true, title: "Article envoyé", description: "Article sur l'IA expédié avec succès", time: "Il y a 1j" },
  { id: 4, read: true, title: "GoldAI disponible", description: "Essayez notre nouveau modèle GoldAI", time: "Il y a 3j" }
];

interface LumSidebarProps {
  activeSection?: string;
}

export default function LumSidebar({ activeSection }: LumSidebarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-card dark:bg-card shadow-lg md:hidden"
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
        className={`fixed inset-y-0 left-0 w-64 bg-sidebar dark:bg-sidebar text-sidebar-foreground dark:text-sidebar-foreground transition-transform duration-300 ease-in-out z-40
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 flex items-center justify-center">
            <span className="font-black text-xl tracking-tighter">LÜM</span>
          </div>

          {/* User Profile Section */}
          <div className="px-4 py-3 flex items-center space-x-3 border-b border-sidebar-border">
            <Avatar className="h-12 w-12 border-2 border-sidebar-border">
              <AvatarImage src="/avatar.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm opacity-70">Premium</p>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="px-4 py-3 border-b border-sidebar-border">
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <button 
                  className="w-full flex items-center px-2 py-2 rounded-lg transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Bell className="w-5 h-5 mr-3" />
                  <span>Notifications</span>
                  {unreadNotifications > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#B91226] text-xs font-medium">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0 bg-card dark:bg-card shadow-lg rounded-lg border border-border"
                align="start" 
                sideOffset={5}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="h-8 text-xs dark:text-foreground dark:hover:bg-secondary dark:hover:text-foreground"
                    disabled={unreadNotifications === 0}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Tout marquer comme lu
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>Aucune notification</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 border-b border-border last:border-0 hover:bg-muted cursor-pointer ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/10'}`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm text-foreground">{notification.title}</h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Navigation */}
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

          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sidebar-foreground">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-sm">Mode sombre</span>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </div>

          {/* Footer/Version */}
          <div className="p-4 text-center border-t border-sidebar-border">
            <p className="text-[10px] text-sidebar-foreground/50">LÜM v1.0.0</p>
            <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">© 2025 LÜM. Tous droits réservés.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
