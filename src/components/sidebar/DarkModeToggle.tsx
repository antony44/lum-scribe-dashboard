
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
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
  );
}
