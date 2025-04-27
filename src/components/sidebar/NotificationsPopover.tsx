
import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/sonner";

interface Notification {
  id: number;
  read: boolean;
  title: string;
  description: string;
  time: string;
}

const defaultNotifications: Notification[] = [
  { id: 1, read: false, title: "Votre article est prêt", description: "Article sur le marketing digital terminé", time: "Il y a 15 min" },
  { id: 2, read: false, title: "Mise à jour de LÜM", description: "Découvrez les nouvelles fonctionnalités", time: "Il y a 2h" },
  { id: 3, read: true, title: "Article envoyé", description: "Article expédié avec succès", time: "Il y a 1j" },
  { id: 4, read: true, title: "Nouvelle fonctionnalité", description: "Essayez notre nouveau moteur LÜM", time: "Il y a 3j" }
];

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
        className="w-80 p-0 bg-card dark:bg-card shadow-lg rounded-lg border border-border no-scrollbar max-h-[400px] overflow-y-auto"
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
        <div className="overflow-y-auto no-scrollbar">
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
  );
}
