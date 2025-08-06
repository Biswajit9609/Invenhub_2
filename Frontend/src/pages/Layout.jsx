// --- FILE: components/Layout.jsx ---

import React from 'react';
import { Home, Package, BarChart2, Settings, Users, ChevronLeft, ChevronRight, User, LogOut, Search } from 'lucide-react';
import { Button, Input, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Avatar, AvatarImage, AvatarFallback } from '../components/ui';

function NavLink({ icon, text, active, alert, isExpanded, onClick }) {
    return (
        <a href="#" onClick={onClick} className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${isExpanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-primary ${isExpanded ? "" : "top-2"}`}></div>}
        </a>
    );
}

export default function AppLayout({ children, currentPage, setCurrentPage, isSidebarExpanded, setIsSidebarExpanded }) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            {/* Sidebar */}
            <aside className={`hidden md:flex flex-col border-r bg-background transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'}`}>
                <div className="flex h-16 items-center justify-between p-4 border-b">
                     <span className={`font-bold text-primary overflow-hidden transition-all ${isSidebarExpanded ? 'w-32' : 'w-0'}`}>InvenHub</span>
                     <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="p-2 rounded-lg hover:bg-accent">
                        {isSidebarExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                     </button>
                </div>
                <nav className="flex-1 p-2 space-y-1">
                    <NavLink icon={<Home className="h-5 w-5" />} text="Dashboard" active={currentPage === 'dashboard'} isExpanded={isSidebarExpanded} onClick={() => setCurrentPage('dashboard')} />
                    <NavLink icon={<Package className="h-5 w-5" />} text="Inventory" active={currentPage === 'inventory'} isExpanded={isSidebarExpanded} onClick={() => setCurrentPage('inventory')} />
                    <NavLink icon={<BarChart2 className="h-5 w-5" />} text="Sales Reports" alert isExpanded={isSidebarExpanded} />
                    <NavLink icon={<Users className="h-5 w-5" />} text="Employees" isExpanded={isSidebarExpanded} />
                </nav>
                 <div className="mt-auto p-2 border-t">
                     <NavLink icon={<Settings className="h-5 w-5" />} text="Settings" isExpanded={isSidebarExpanded} />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
                    <button className="md:hidden p-2 rounded-lg hover:bg-accent" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                        <Package className="h-6 w-6" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </button>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search products..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon" className="rounded-full border w-9 h-9">
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/40x40/2a9c8d/white?text=A" alt="@admin" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" /><span>Logout</span></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                {children}
            </div>
        </div>
    );
}