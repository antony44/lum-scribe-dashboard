
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
  return (
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
  );
}
