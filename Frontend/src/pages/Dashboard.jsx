import { useState } from "react";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import {
  DollarSign,
  Activity,
  CreditCard,
  Users,
} from "lucide-react";

// Import your existing layout and UI components
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- MOCK DATA FOR A TWO-SERIES CHART ---
const chartData = [
  { date: "2024-06-01", sales: 178, subscriptions: 80 },
  { date: "2024-06-02", sales: 470, subscriptions: 200 },
  { date: "2024-06-03", sales: 103, subscriptions: 120 },
  { date: "2024-06-04", sales: 439, subscriptions: 180 },
  { date: "2024-06-05", sales: 88, subscriptions: 90 },
  { date: "2024-06-06", sales: 294, subscriptions: 120 },
  { date: "2024-06-07", sales: 323, subscriptions: 140 },
  { date: "2024-06-08", sales: 385, subscriptions: 150 },
  { date: "2024-06-09", sales: 438, subscriptions: 210 },
  { date: "2024-06-10", sales: 155, subscriptions: 80 },
  { date: "2024-06-11", sales: 92, subscriptions: 60 },
  { date: "2024-06-12", sales: 492, subscriptions: 250 },
  { date: "2024-06-13", sales: 81, subscriptions: 50 },
  { date: "2024-06-14", sales: 426, subscriptions: 220 },
  { date: "2024-06-15", sales: 307, subscriptions: 180 },
  { date: "2024-06-16", sales: 371, subscriptions: 190 },
  { date: "2024-06-17", sales: 475, subscriptions: 280 },
  { date: "2024-06-18", sales: 107, subscriptions: 90 },
  { date: "2024-06-19", sales: 341, subscriptions: 160 },
  { date: "2024-06-20", sales: 408, subscriptions: 190 },
  { date: "2024-06-21", sales: 169, subscriptions: 110 },
  { date: "2024-06-22", sales: 317, subscriptions: 150 },
  { date: "2024-06-23", sales: 480, subscriptions: 260 },
  { date: "2024-06-24", sales: 132, subscriptions: 80 },
  { date: "2024-06-25", sales: 141, subscriptions: 70 },
  { date: "2024-06-26", sales: 434, subscriptions: 200 },
  { date: "2024-06-27", sales: 448, subscriptions: 210 },
  { date: "2024-06-28", sales: 149, subscriptions: 100 },
  { date: "2024-06-29", sales: 103, subscriptions: 90 },
  { date: "2024-06-30", sales: 446, subscriptions: 240 },
];

// --- CHART CONFIG USING YOUR CSS VARIABLES ---
const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)", // Uses the color from your provided CSS
  },
  subscriptions: {
    label: "Subscriptions",
    color: "var(--chart-2)", // Uses the color from your provided CSS
  },
};

// --- MOCK DATA FOR RECENT SALES ---
const recentSales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", avatar: "OM" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", avatar: "JL" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", avatar: "IN" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "WK" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", avatar: "SD" },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("30d");

  const filteredData = chartData.slice(-parseInt(timeRange.replace("d", "")));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">InvenHub</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* The time range selector has been moved from here */}
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 justify-evenly">
          {/* Top-level AI Insight Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Showing sales and subscriptions for the selected period.</CardDescription>
                </div>
                {/* The time range selector is now here */}
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-full md:w-[160px] rounded-lg">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="90d" className="rounded-lg">Last 90 days</SelectItem>
                    <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
                    <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillSubscriptions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-subscriptions)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-subscriptions)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
                      tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Area dataKey="subscriptions" type="natural" fill="url(#fillSubscriptions)" stroke="var(--color-subscriptions)" stackId="a" />
                    <Area dataKey="sales" type="natural" fill="url(#fillSales)" stroke="var(--color-sales)" stackId="a" />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-8">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
                      <AvatarFallback>{sale.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
