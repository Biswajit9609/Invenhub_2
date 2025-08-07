import { useState } from "react";
import {
  PackagePlus,
  Plus,
  Minus,
  ChevronsUpDown,
  Check,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner"; // Using toast for notifications

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
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for class names

// --- MOCK PRODUCT DATA ---
const initialProducts = [
  { id: "PROD-001", name: "Premium Wireless Mouse", category: "Electronics", price: 75.50, quantity: 88 },
  { id: "PROD-002", name: "Mechanical Keyboard", category: "Electronics", price: 120.00, quantity: 45 },
  { id: "PROD-003", name: "Organic Cotton T-Shirt", category: "Apparel", price: 25.00, quantity: 150 },
  { id: "PROD-004", name: "Stainless Steel Water Bottle", category: "Kitchenware", price: 15.99, quantity: 200 },
];

export default function ManageStockPage() {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", quantity: "" });
  const [selectedProduct, setSelectedProduct] = useState("PROD-001");
  const [stockAdjustment, setStockAdjustment] = useState(1);
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: `PROD-${String(Date.now()).slice(-3)}`,
      ...newProduct,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity, 10),
    };
    setProducts(prev => [productToAdd, ...prev]);
    setNewProduct({ name: "", category: "", price: "", quantity: "" }); // Reset form
    toast.success(`Product "${productToAdd.name}" added successfully!`);
  };

  const handleStockChange = (operation) => {
    if (!selectedProduct) {
        toast.error("Please select a product first.");
        return;
    }
    const amount = operation === 'add' ? Number(stockAdjustment) : -Number(stockAdjustment);
    const productName = products.find(p => p.id === selectedProduct)?.name;

    setProducts(prev => prev.map(p => 
        p.id === selectedProduct 
        ? { ...p, quantity: Math.max(0, p.quantity + amount) } // Ensure stock doesn't go below zero
        : p
    ));
    
    toast.success(`Stock for "${productName}" updated.`);
  };
  
  const currentSelectedProduct = products.find(p => p.id === selectedProduct);

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
                  <BreadcrumbPage>Manage Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Tabs defaultValue="update-stock" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-10 mb-5 md:w-[400px]">
              <TabsTrigger value="add-new">
                <PackagePlus className="mr-2 h-4 w-4" /> Add New Product
              </TabsTrigger>
              <TabsTrigger value="update-stock">
                <Warehouse className="mr-2 h-4 w-4" /> Update Stock
              </TabsTrigger>
            </TabsList>

            {/* Tab for Updating Existing Stock */}
            <TabsContent value="update-stock">
              <Card className="transition-all duration-200">
                <CardHeader>
                  <CardTitle>Update Existing Stock</CardTitle>
                  <CardDescription>
                    Search for a product to add or remove available units from your inventory.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Product</Label>
                    <Popover open={searchPopoverOpen} onOpenChange={setSearchPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={searchPopoverOpen} className="w-full justify-between md:w-[300px]">
                          {selectedProduct ? products.find(p => p.id === selectedProduct)?.name : "Select product..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search product..." />
                          <CommandList>
                            <CommandEmpty>No product found.</CommandEmpty>
                            <CommandGroup>
                              {products.map((product) => (
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
                  {currentSelectedProduct && (
                    <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                        <div>
                            <Label className="text-sm text-muted-foreground">Current Stock</Label>
                            <p className="text-2xl font-bold">{currentSelectedProduct.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleStockChange('remove')}><Minus className="h-4 w-4" /></Button>
                            <Input id="stock-adjustment" type="number" value={stockAdjustment} onChange={(e) => setStockAdjustment(Number(e.target.value))} min="1" className="w-20 text-center" />
                            <Button variant="outline" size="icon" onClick={() => handleStockChange('add')}><Plus className="h-4 w-4" /></Button>
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab for Adding a New Product */}
            <TabsContent value="add-new">
              <Card>
                <CardHeader>
                  <CardTitle>Add a New Product</CardTitle>
                  <CardDescription>
                    Use this form to add a completely new item to your inventory.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleAddNewProduct}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" name="name" placeholder="e.g., Mechanical Keyboard" value={newProduct.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" name="category" placeholder="e.g., Electronics" value={newProduct.category} onChange={handleInputChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input id="price" name="price" type="number" placeholder="e.g., 120.00" value={newProduct.price} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="quantity">Initial Quantity</Label>
                          <Input id="quantity" name="quantity" type="number" placeholder="e.g., 50" value={newProduct.quantity} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full mt-7">Add Product to Inventory</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
