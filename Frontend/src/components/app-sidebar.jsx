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
      url: "/dashboard",
      icon: LayoutDashboard ,
      isActive: true,
      items:[

      ]
    },
    {
      title: "Inventory",
      url: "/inventory",
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
          url: "/purchase-transaction",
        },
        {
          title: "Sales Records",
          url: "/sales-transaction",
        }
      ],
    },
    {
      title: "AI prediction",
      url: "/prediction",
      icon: Brain ,
      isActive: true
    },
    {
      title: "Add Product",
      url: "/add-product",
      icon: PackageSearch ,
      isActive: true
    },
    {
      title: "New Sale",
      url: "/new-sale",
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
      url: "/add-product",
      icon: Frame,
    },
    {
      name: "New Sale",
      url: "/new-sale",
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
    try {
      // 1. Get the token from localStorage
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("No access token found.");
        return; // Stop if no token is available
      }

      // 2. Make the API call with the Authorization header
      const res = await axios.post(
        "https://invenhub-2.onrender.com/api/v1/user/user-data",
        {}, // Empty body for a POST request, as needed
        {
          headers: {
            // 3. Attach the token
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 4. Access the data correctly from the axios response
      const responseData = res.data; 
      
      // Check if the data and user exist in the response
      if (responseData && responseData.data && responseData.data.user) {
        setUser(responseData.data.user);
      } else {
        console.log("User data not found in the response:", responseData);
      }

    } catch (error) {
      console.error("Error fetching user:", error.response?.data?.message || error.message);
    }
  };

  getUser();
}, []);

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
