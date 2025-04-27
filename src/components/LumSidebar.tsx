
import { useState } from "react";
import { UserProfile } from "./sidebar/UserProfile";
import { NotificationsPopover } from "./sidebar/NotificationsPopover";
import { NavigationItems } from "./sidebar/NavigationItems";
import { DarkModeToggle } from "./sidebar/DarkModeToggle";
import Logo from "./Logo";

interface LumSidebarProps {
  activeSection?: string;
}

export default function LumSidebar({ activeSection }: LumSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  
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
            <Logo />
          </div>

          <UserProfile />

          {/* Notifications Section */}
          <div className="px-4 py-3 border-b border-sidebar-border">
            <NotificationsPopover />
          </div>

          <NavigationItems activeSection={activeSection} />

          <DarkModeToggle />

          {/* Footer/Version */}
          <div className="p-3 text-center border-t border-sidebar-border">
            <p className="text-[9px] text-sidebar-foreground/50">LÜM v1.0.0</p>
            <p className="text-[9px] text-sidebar-foreground/50 mt-0.5">© 2025 LÜM. Tous droits réservés.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
