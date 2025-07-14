import { Link } from 'react-router-dom';

import {
  AudioWaveform,
  BookOpen,
  ArrowRightLeft,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  LayoutDashboard ,
  Brain,
  PackageSearch,
  ShoppingCart,
  Warehouse 

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard ,
      isActive: true,
      items:[

      ]
    },
    {
      title: "Inventory",
      url: "#",
      icon: Warehouse  ,
      isActive: true
    },
    {
      title: "Transaction Record",
      url: "#",
      icon: ArrowRightLeft,
      items: [
        {
          title: "Purchase Records",
          url: "#",
        },
        {
          title: "Sales Records",
          url: "#",
        }
      ],
    },
    {
      title: "AI prediction",
      url: "#",
      icon: Brain ,
      isActive: true
    },
    {
      title: "Add Product",
      url: "#",
      icon: PackageSearch ,
      isActive: true
    },
    {
      title: "New Sale",
      url: "#",
      icon: ShoppingCart ,
      isActive: true
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        }
      ],
    }
  ],
  projects: [
    {
      name: "Add Product",
      url: "#",
      icon: Frame,
    },
    {
      name: "New Sale",
      url: "#",
      icon: PieChart,
    }
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
