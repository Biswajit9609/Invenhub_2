import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import {
  BrainCircuit,
  TrendingUp,
  Package,
  Shapes,
  DollarSign,
  ChevronsUpDown,
  Check,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for class names

// --- MOCK AI & PRODUCT DATA ---
const overallPredictionData = [
  { month: "Jan", historical: 4000, predicted: 4200 },
  { month: "Feb", historical: 3000, predicted: 3100 },
  { month: "Mar", historical: 2000, predicted: 2200 },
  { month: "Apr", historical: 2780, predicted: 2900 },
  { month: "May", historical: 1890, predicted: 2000 },
  { month: "Jun", historical: 2390, predicted: 2500 },
  { month: "Jul", historical: 3490, predicted: 3600 },
  { month: "Aug", predicted: 3800 },
  { month: "Sep", predicted: 4100 },
];

// Function to generate mock data for a specific product
const generateProductPredictionData = (productId) => {
    if (!productId) return [];
    const base = parseInt(productId.slice(-3), 10);
    return overallPredictionData.map(d => ({
        ...d,
        historical: d.historical ? (d.historical * (base / 400)) : undefined,
        predicted: d.predicted ? (d.predicted * (base / 400)) : undefined,
    })).slice(0, 7); // Show slightly different data for products
};

// --- CORRECTED CHART CONFIG ---
// Removed the incorrect hsl() wrapper.
const salesChartConfig = {
  historical: { label: "Historical", color: "var(--chart-2)" },
  predicted: { label: "Predicted", color: "var(--chart-1)" },
};

const topCategoriesData = [
    { name: 'Electronics', sales: 4500, fill: 'var(--chart-1)' },
    { name: 'Apparel', sales: 3200, fill: 'var(--chart-2)' },
    { name: 'Fitness', sales: 2800, fill: 'var(--chart-3)' },
    { name: 'Kitchenware', sales: 2100, fill: 'var(--chart-4)' },
    { name: 'Home Goods', sales: 1800, fill: 'var(--chart-5)' },
];

const mockProducts = [
  { id: "PROD-001", name: "Premium Wireless Mouse" },
  { id: "PROD-002", name: "Mechanical Keyboard" },
  { id: "PROD-003", name: "Organic Cotton T-Shirt" },
  { id: "PROD-004", name: "Stainless Steel Water Bottle" },
  { id: "PROD-005", name: "Yoga Mat" },
  { id: "PROD-006", name: "Leather Bound Journal" },
  { id: "PROD-007", name: "Smart LED Bulb" },
];

export default function AIPredictionPage() {
  const [forecastType, setForecastType] = useState("overall");
  const [selectedProduct, setSelectedProduct] = useState("PROD-002");
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);

  const productPredictionData = generateProductPredictionData(selectedProduct);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">InvenHub</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>AI Predictions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* Top-level AI Insight Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Predicted Q3 Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$125,840</div>
                <p className="text-xs text-muted-foreground">+15.2% vs Q2 (Projected)</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
                <BrainCircuit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-muted-foreground">Based on last 60 days of data</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Growth Category</CardTitle>
                <Shapes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Fitness</div>
                <p className="text-xs text-muted-foreground">+45% sales growth this quarter</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Highest Demand Product</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Mechanical Keyboard</div>
                <p className="text-xs text-muted-foreground">850 units sold last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Sales Prediction Chart */}
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle>Sales Forecast</CardTitle>
                  <CardDescription>View overall or product-specific sales predictions.</CardDescription>
                </div>
                <Select value={forecastType} onValueChange={setForecastType}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select forecast type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="overall">Overall Prediction</SelectItem>
                        <SelectItem value="product">Product-Based</SelectItem>
                    </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                {forecastType === 'product' && (
                    <div className="mb-4">
                        <Popover open={searchPopoverOpen} onOpenChange={setSearchPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={searchPopoverOpen} className="w-full justify-between md:w-[280px]">
                                    {selectedProduct ? mockProducts.find(p => p.id === selectedProduct)?.name : "Select product..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 md:w-[280px]">
                                <Command>
                                    <CommandInput placeholder="Search product..." />
                                    <CommandList>
                                        <CommandEmpty>No product found.</CommandEmpty>
                                        <CommandGroup>
                                            {mockProducts.map((product) => (
                                                <CommandItem
                                                    key={product.id}
                                                    value={product.name}
                                                    onSelect={() => {
                                                        setSelectedProduct(product.id);
                                                        setSearchPopoverOpen(false);
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", selectedProduct === product.id ? "opacity-100" : "opacity-0")} />
                                                    {product.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                <ChartContainer config={salesChartConfig} className="aspect-auto h-[250px] w-full">
                  <BarChart data={forecastType === 'overall' ? overallPredictionData : productPredictionData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="historical" fill="var(--color-historical)" radius={4} />
                    <Bar dataKey="predicted" fill="var(--color-predicted)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Selling Categories Pie Chart */}
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col">
                <CardHeader>
                    <CardTitle>Top Selling Categories</CardTitle>
                    <CardDescription>A breakdown of sales distribution across top categories.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer config={{}} className="mx-auto aspect-square h-full max-h-[250px]">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie data={topCategoriesData} dataKey="sales" nameKey="name" innerRadius={60}>
                                {topCategoriesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
          </div>

          {/* Product-Specific Forecast Details */}
          <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                <CardTitle>Forecast Details for: {selectedProduct ? mockProducts.find(p => p.id === selectedProduct)?.name : "N/A"}</CardTitle>
                <CardDescription>Detailed AI analysis for the selected product.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Predicted Sales (Next 30 Days)</p>
                        <p className="text-2xl font-bold">
                            {selectedProduct ? `${(parseInt(selectedProduct.slice(-3)) * 0.4).toFixed(0)} units` : 'N/A'}
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Confidence Level</p>
                        <p className="text-2xl font-bold">
                            {selectedProduct ? `${(90 + parseInt(selectedProduct.slice(-1))) % 100}%` : 'N/A'}
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Recommended Action</p>
                        <Badge variant={selectedProduct && parseInt(selectedProduct.slice(-1)) > 5 ? "default" : "secondary"}>
                            {selectedProduct && parseInt(selectedProduct.slice(-1)) > 5 ? 'Increase Stock' : 'Monitor'}
                        </Badge>
                    </div>
                </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
