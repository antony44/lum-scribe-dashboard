
import Logo from "./Logo";
import { Bell } from "lucide-react";

export default function OrdersHistoryHeader() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 rounded-b-lg shadow-sm border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Logo />
        <span className="ml-2 text-xs text-muted-foreground font-medium">Client Logo</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Notifications">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="bg-[#0A223C] text-white rounded-full w-9 h-9 flex items-center justify-center font-bold shadow">JL</div>
      </div>
    </header>
  );
}
