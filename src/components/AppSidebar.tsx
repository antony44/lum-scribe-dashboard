
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  List,
  ChartBar,
  Wallet,
  Users,
  User,
  HelpCircle,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Logo from "./Logo";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Order Article",
    path: "/order",
    icon: FilePlus,
  },
  {
    label: "Articles / Orders",
    path: "/articles",
    icon: List,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: ChartBar,
  },
  {
    label: "Invoices & Payments",
    path: "/invoices",
    icon: Wallet,
  },
  {
    label: "Referral Program",
    path: "/referral",
    icon: Users,
  },
  {
    label: "Profile",
    path: "/account",
    icon: User,
  },
  {
    label: "Support & FAQ",
    path: "/support",
    icon: HelpCircle,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-background min-h-screen">
      <SidebarContent>
        <div className="py-6 px-4 flex items-center mb-2">
          <Logo />
          <span className="ml-2 font-black text-xl tracking-tighter">LÜM</span>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 w-full py-2 px-3 rounded-lg transition ${
                          isActive
                            ? "bg-accent text-accent-foreground font-semibold"
                            : "text-muted-foreground hover:bg-accent"
                        }`
                      }
                      end={item.path === "/"}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
