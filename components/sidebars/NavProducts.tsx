"use client"
import {
  ChartColumnIncreasing,
  Eye,
  FileText,
  MoreHorizontal,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavProducts({
  products,
}: {
  products: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-white text-lg mb-2">Products</SidebarGroupLabel>
      <SidebarMenu className="flex-col gap-4">
        {products.map((item) => (
          <SidebarMenuItem key={item.name} className="flex-row items-center gap-2 justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="px-2 py-6 bg-white">
                  <div className="bg-black rounded-lg size-8 flex items-center justify-center">
                    <item.icon color="#fff"/>
                  </div>
                  <span className="font-bold">{item.name}</span>
                  <MoreHorizontal className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-40"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <Link href={"/dashboard/invoice/create/1"}>
                  <DropdownMenuItem>
                    <FileText className="text-muted-foreground" />
                    <span>Create Invoice</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/invoice/view/1"}>
                  <DropdownMenuItem>
                    <Eye className="text-muted-foreground" />
                    <span>View History</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/customer/add/1"}>
                  <DropdownMenuItem>
                    <Users className="text-muted-foreground" />
                    <span>Add Customers</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/statistics/1"}>
                  <DropdownMenuItem>
                    <ChartColumnIncreasing className="text-muted-foreground" />
                    <span>Statistics</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href={"/dashboard/setting/1"}>
                  <DropdownMenuItem>
                    <Settings className="text-muted-foreground" />
                    <span>Product Setting</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}