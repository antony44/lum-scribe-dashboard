
import Logo from "./Logo";
import { Bell } from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-sm border mb-6 sticky top-0 z-30">
      {/* Logo (left) */}
      <div className="flex items-center">
        <Logo />
      </div>
      {/* Actions (right) */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-2 hover:bg-gray-100 transition"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        {/* User profile */}
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm text-muted-foreground">JL Co</span>
          <div className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-semibold shadow-sm select-none">
            JL
          </div>
        </div>
      </div>
    </header>
  );
}
