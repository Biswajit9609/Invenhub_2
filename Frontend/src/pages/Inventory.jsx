import { useState } from "react"
import {
  Archive,
  Boxes,
  ChevronRight,
  ClipboardPlus,
  MoreHorizontal,
  Package,
  PackageSearch,
  PlusCircle,
  Search,
  Trash2,
  Warehouse,
  Printer,
} from "lucide-react"

// Import your existing layout components
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Import shadcn/ui components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// --- MOCK DATA ---
const mockProducts = [
  { id: "PROD-001", name: "Premium Wireless Mouse", category: "Electronics", price: 75.50, quantity: 88 },
  { id: "PROD-002", name: "Mechanical Keyboard", category: "Electronics", price: 120.00, quantity: 45 },
  { id: "PROD-003", name: "Organic Cotton T-Shirt", category: "Apparel", price: 25.00, quantity: 150 },
  { id: "PROD-004", name: "Stainless Steel Water Bottle", category: "Kitchenware", price: 15.99, quantity: 200 },
  { id: "PROD-005", name: "Yoga Mat", category: "Fitness", price: 30.00, quantity: 0, },
  { id: "PROD-006", name: "Leather Bound Journal", category: "Stationery", price: 22.00, quantity: 8, },
  { id: "PROD-007", name: "Smart LED Bulb", category: "Home Goods", price: 18.50, quantity: 110 },
  { id: "PROD-008", name: "Bluetooth Speaker", category: "Electronics", price: 89.99, quantity: 30 },
  { id: "PROD-009", name: "Running Shoes", category: "Fitness", price: 110.00, quantity: 60 },
  { id: "PROD-010", name: "Glass Food Containers", category: "Kitchenware", price: 45.00, quantity: 95 },
];

export default function InventoryPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", quantity: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockToAdd, setStockToAdd] = useState(1);

  // --- Calculations ---
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);
  const outOfStockItems = products.filter(p => p.quantity === 0).length;
  const totalCategories = new Set(products.map(p => p.category)).size;

  // --- Filter and Pagination Logic ---
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // --- Handler for "Add Product" Form ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewProduct(prev => ({ ...prev, [id]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: `PROD-${Date.now().toString().slice(-4)}`,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity, 10),
    };
    setProducts(prevProducts => [productToAdd, ...prevProducts]);
    setNewProduct({ name: "", category: "", price: "", quantity: "" });
    setIsAddProductDialogOpen(false);
  };

  // --- Handler for "Add Stock" Drawer ---
  const handleUpdateStock = () => {
    if (!selectedProduct || stockToAdd <= 0) return;

    setProducts(currentProducts =>
      currentProducts.map(p =>
        p.id === selectedProduct.id
          ? { ...p, quantity: p.quantity + Number(stockToAdd) }
          : p
      )
    );

    setSelectedProduct(null);
    setStockToAdd(1);
  };

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
                <BreadcrumbItem className="hidden md:block"><BreadcrumbLink href="#">InvenHub</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem><BreadcrumbPage>Inventory</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Warehouse className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">Unique items in inventory</p>
              </CardContent>
            </Card>
            <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stock Quantity</CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStock}</div>
                <p className="text-xs text-muted-foreground">Across all products</p>
              </CardContent>
            </Card>
            <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <PackageSearch className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCategories}</div>
                <p className="text-xs text-muted-foreground">Product categories managed</p>
              </CardContent>
            </Card>
            <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <Package className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{outOfStockItems}</div>
                <p className="text-xs text-muted-foreground">Items needing restock</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your products and view their stock status.</CardDescription>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Archive className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">View Deleted</span>
                  </Button>
                  <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Fill in the details below to add a new item to your inventory.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddProduct}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={newProduct.name} onChange={handleInputChange} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Input id="category" value={newProduct.category} onChange={handleInputChange} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price ($)</Label>
                            <Input id="price" type="number" value={newProduct.price} onChange={handleInputChange} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">Quantity</Label>
                            <Input id="quantity" type="number" value={newProduct.quantity} onChange={handleInputChange} className="col-span-3" required />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Product</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search by name or ID..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{product.category}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.quantity === 0 ? "destructive" : product.quantity < 10 ? "secondary" : "outline"}>
                          {product.quantity === 0 ? "Out of Stock" : product.quantity < 10 ? "Low Stock" : "In Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => setSelectedProduct(product)}>
                              <ClipboardPlus className="mr-2 h-4 w-4" />Add Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem><Printer className="mr-2 h-4 w-4" />Print Barcode</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePreviousPage(); }} disabled={currentPage === 1} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handleNextPage(); }} disabled={currentPage === totalPages} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          </Card>
        </main>

        <Drawer open={!!selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
          <DrawerContent>
            {selectedProduct && (
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Add Stock: {selectedProduct.name}</DrawerTitle>
                  <DrawerDescription>Current quantity: {selectedProduct.quantity}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setStockToAdd(prev => Math.max(1, prev - 1))}><span className="sr-only">-</span>-</Button>
                    <div className="flex-1 text-center">
                      <div className="text-5xl font-bold tracking-tighter">{stockToAdd}</div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">Quantity to add</div>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => setStockToAdd(prev => prev + 1)}><span className="sr-only">+</span>+</Button>
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={handleUpdateStock}>Update Stock</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            )}
          </DrawerContent>
        </Drawer>
      </SidebarInset>
    </SidebarProvider>
  )
}