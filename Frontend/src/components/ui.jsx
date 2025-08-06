// --- FILE: components/ui.jsx ---

import React, { useState, createContext, useContext, forwardRef } from 'react';

export const Card = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
));
export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
));
export const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
));
export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />
));
export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
export const Input = forwardRef(({ className, type, ...props }, ref) => (
  <input type={type} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />
));
export const Button = forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
    };
    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
    };
    return <button className={`${variants[variant]} ${sizes[size]} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`} ref={ref} {...props} />;
});
const DropdownMenuContext = createContext();
export const DropdownMenu = ({ children }) => {
    const [open, setOpen] = useState(false);
    return <DropdownMenuContext.Provider value={{ open, setOpen }}>{children}</DropdownMenuContext.Provider>;
};
export const DropdownMenuTrigger = ({ children }) => {
    const { setOpen } = useContext(DropdownMenuContext);
    const handleToggle = (e) => {
        e.stopPropagation();
        setOpen(prev => !prev);
    };
    return <div onClick={handleToggle}>{children}</div>;
};
export const DropdownMenuContent = ({ children, className, align = 'end' }) => {
    const { open } = useContext(DropdownMenuContext);
    if (!open) return null;
    const alignmentClass = align === 'end' ? 'right-0' : 'left-0';
    return <div className={`absolute ${alignmentClass} mt-2 w-48 origin-top-right rounded-md bg-popover text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${className}`}>{children}</div>;
};
export const DropdownMenuItem = ({ children, className }) => (
    <div className={`flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent ${className}`}>{children}</div>
);
export const DropdownMenuSeparator = () => <div className="-mx-1 my-1 h-px bg-muted" />;
export const Avatar = ({ children, className }) => <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>;
export const AvatarImage = ({ src, alt }) => <img src={src} alt={alt} className="aspect-square h-full w-full" />;
export const AvatarFallback = ({ children, className }) => <span className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}>{children}</span>;
export const Tabs = ({ children, className, defaultValue }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return <div className={className}>{React.Children.map(children, child => React.cloneElement(child, { activeTab, setActiveTab }))}</div>;
};
export const TabsList = ({ children, className, activeTab, setActiveTab }) => <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>{React.Children.map(children, child => React.cloneElement(child, { active: child.props.value === activeTab, onClick: () => setActiveTab(child.props.value) }))}</div>;
export const TabsTrigger = ({ children, className, active, onClick }) => <button onClick={onClick} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${active ? 'bg-background text-foreground shadow-sm' : ''} ${className}`}>{children}</button>;
export const Table = forwardRef(({ className, ...props }, ref) => <table ref={ref} className={`w-full caption-bottom text-sm ${className}`} {...props} />);
export const TableHeader = forwardRef(({ className, ...props }, ref) => <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />);
export const TableBody = forwardRef(({ className, ...props }, ref) => <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />);
export const TableRow = forwardRef(({ className, ...props }, ref) => <tr ref={ref} className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`} {...props} />);
export const TableHead = forwardRef(({ className, ...props }, ref) => <th ref={ref} className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />);
export const TableCell = forwardRef(({ className, ...props }, ref) => <td ref={ref} className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />);
export const Badge = ({ className, variant = 'default', ...props }) => {
    const variants = {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
    };
    return <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`} {...props} />;
};