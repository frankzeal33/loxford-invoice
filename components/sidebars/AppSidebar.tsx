"use client"
import * as React from "react"
import {
  BookOpen,
  Bot,
  ChartCandlestick,
  Command,
  DollarSign,
  Drumstick,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Truck,
  Utensils,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavProducts } from "./NavProducts"
import { NavUser } from "./NavUser"

const data = {
  user: {
    name: "Ojiego Franklin",
    email: "frankzeal33@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  products: [
    {
      name: "TRADING",
      url: "#",
      icon: ChartCandlestick,
    },
    {
      name: "FOODING",
      url: "#",
      icon: Utensils,
    },
    {
      name: "LOXPAY",
      url: "#",
      icon: DollarSign,
    },
    {
      name: "NAVO",
      url: "#",
      icon: Truck,
    },
    {
      name: "MEATNG",
      url: "#",
      icon: Drumstick,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="bg-primary">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-black">LOXFORD COMPANY</span>
                  <span className="truncate font-bold text-xs text-brand-orange">Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-primary">
        <NavProducts products={data.products} />
      </SidebarContent>
      <SidebarFooter className="bg-primary">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
