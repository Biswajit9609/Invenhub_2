"use client"
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {ModeToggle} from "./mode-toggle"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="flex h-15 lg:h-[8vh] w-full shrink-0 items-center px-4 md:px-6 justify-between bg-[var(--background)] fixed z-50">
      <Sheet className="">
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6 px-10">
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Services
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:block" prefetch={false}>
        <Link href="#"><h1 className="text-xl font">Inven<span className="text-[var(--primary)]">Hub</span></h1></Link>
        <span className="sr-only">Acme Inc</span>
      </Link>
      <div className="hidden lg:block items-center gap-4">
        <NavigationMenu viewport={false}>
         <NavigationMenuList  className="flex gap-5">
           <NavigationMenuItem>
  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
  <NavigationMenuContent className="z-999">
    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
            href="/features"
          >
            <div className="mt-4 mb-2 text-lg font-medium">
              All Features
            </div>
            <p className="text-muted-foreground text-sm leading-tight">
              Powerful tools to manage inventory, sales, and billing effortlessly.
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
      <ListItem className="hover:bg-[#eaefee] rounded-sm dark:hover:bg-[var(--secondary)]" href="/features/inventory" title="Smart Inventory">
        Real-time stock tracking with low stock alerts.
      </ListItem>
      <ListItem className="hover:bg-[#eaefee] rounded-sm dark:hover:bg-[var(--secondary)]" href="/features/billing" title="Barcode Billing">
        Fast billing with wireless barcode printing & scanning.
      </ListItem>
      <ListItem className="hover:bg-[#eaefee] rounded-sm dark:hover:bg-[var(--secondary)]" href="/features/insights" title="AI Insights">
        Sales predictions and stock recommendations powered by AI.
      </ListItem>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>

<NavigationMenuItem>
  <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {[
        { title: "Starter", href: "/pricing#starter", description: "Basic features for small shops." },
        { title: "Professional", href: "/pricing#pro", description: "Advanced billing and team management." },
        { title: "Enterprise", href: "/pricing#enterprise", description: "Full AI features & dedicated support." },
      ].map((plan) => (
        <ListItem
          className="hover:bg-[#eaefee] rounded-sm dark:hover:bg-[var(--secondary)]"
          key={plan.title}
          title={plan.title}
          href={plan.href}
        >
          {plan.description}
        </ListItem>
      ))}
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>


          
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={`ml-5 ${navigationMenuTriggerStyle()}`}>
              <Link href="/docs" className="nav-link">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={`ml-7 ${navigationMenuTriggerStyle()}`}>
              <Link href="/docs" className="nav-link">Contact Us</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle classNam />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </div>
      <div className="hidden lg:block items-center gap-4">
        <NavigationMenu viewport={false}>
         <NavigationMenuList  className="flex gap-5">

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={`ml-5 ${navigationMenuTriggerStyle()}`}>
              <Link to='/login' className="nav-link mr-5">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <Link to='/sign-up'><button className="get-started-btn flex justify-center items-center">Get Started</button></Link>
        </NavigationMenuList>
      </NavigationMenu>
      </div>

      <Link className="lg:hidden"><button className="px-4 py-2 bg-[var(--primary)] rounded-3xl text-white">Get Started</button></Link>
    </header>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}