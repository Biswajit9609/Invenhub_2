import { Link } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from 'react';
import {
  AudioWaveform,
  BookOpen,
  ArrowRightLeft,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  LayoutDashboard ,
  Brain,
  PackageSearch,
  ShoppingCart,
  Warehouse 

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
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
  const [user, setUser] = useState({})

useEffect(() => {
  const getUser = async () => {
    console.log("first")
    try {
      console.log("second")
      const res = await axios.post(
  "https://invenhub-2.onrender.com/api/v1/user/user-data",
  {}, // your request body here
  {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  }
);
      console.log("third")
      const data = await res.json()
      console.log("Full API response:", data)
      console.log("Hello world")
      setUser(data.data.user)
    } catch (error) {
      // console.log("error")
      console.log("Error fetching user:", error)
    }
  }
  getUser()
}, [])

// console.log(user)

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
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
