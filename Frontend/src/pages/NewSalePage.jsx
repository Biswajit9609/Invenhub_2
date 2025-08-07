import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  Ticket,
  User,
  PackagePlus,
} from "lucide-react";
import { toast } from "sonner";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// --- MOCK DATA ---
const availableProducts = [
  { id: "PROD-001", name: "Premium Wireless Mouse", category: "Electronics", price: 75.50, stock: 88 },
  { id: "PROD-002", name: "Mechanical Keyboard", category: "Electronics", price: 120.00, stock: 45 },
  { id: "PROD-003", name: "Organic Cotton T-Shirt", category: "Apparel", price: 25.00, stock: 150 },
  { id: "PROD-004", name: "Stainless Steel Water Bottle", category: "Kitchenware", price: 15.99, stock: 200 },
  { id: "PROD-005", name: "Yoga Mat", category: "Fitness", price: 30.00, stock: 30 },
  { id: "PROD-006", name: "Leather Bound Journal", category: "Stationery", price: 22.00, stock: 8 },
];

const MOCK_COUPONS = {
    "SAVE10": 0.10, // 10% discount
    "SUMMER20": 0.20, // 20% discount
};

export default function NewSalePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [customerPhone, setCustomerPhone] = useState("");

  // State for quantity dialog
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  const filteredProducts = availableProducts.filter(p =>
    searchTerm && (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuantityToAdd(1);
    setIsQuantityDialogOpen(true);
  };
  
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    const productWithQuantity = { ...selectedProduct, quantity: Number(quantityToAdd) };

    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productWithQuantity.id);
        if (existingItem) {
            const newQuantity = existingItem.quantity + productWithQuantity.quantity;
            if (newQuantity <= selectedProduct.stock) {
                toast.success(`"${selectedProduct.name}" quantity updated in cart.`);
                return prevCart.map(item => item.id === productWithQuantity.id ? { ...item, quantity: newQuantity } : item);
            } else {
                toast.error(`Not enough stock for "${selectedProduct.name}". Only ${selectedProduct.stock} available.`);
                return prevCart;
            }
        } else {
            if (productWithQuantity.quantity <= selectedProduct.stock) {
                toast.success(`"${selectedProduct.name}" added to cart.`);
                return [...prevCart, productWithQuantity];
            } else {
                toast.error(`Not enough stock for "${selectedProduct.name}". Only ${selectedProduct.stock} available.`);
                return prevCart;
            }
        }
    });

    setIsQuantityDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (productId, operation) => {
    setCart(prevCart => {
        const productInCart = prevCart.find(item => item.id === productId);
        const productInStock = availableProducts.find(p => p.id === productId);

        if (operation === 'increment' && productInCart.quantity < productInStock.stock) {
            return prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
        } else if (operation === 'decrement') {
            const newCart = prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
            return newCart.filter(item => item.quantity > 0); // Remove if quantity is 0
        } else if (operation === 'increment') {
            toast.error(`No more stock for "${productInCart.name}".`);
        }
        return prevCart;
    });
  };
  
  const handleRemoveFromCart = (productId) => {
      const productName = cart.find(item => item.id === productId)?.name;
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      toast.info(`"${productName}" removed from cart.`);
  };

  const handleApplyCoupon = () => {
      const appliedDiscount = MOCK_COUPONS[couponCode.toUpperCase()];
      if (appliedDiscount) {
          setDiscount(appliedDiscount);
          toast.success(`Coupon "${couponCode.toUpperCase()}" applied!`);
      } else {
          setDiscount(0);
          toast.error("Invalid coupon code.");
      }
  };
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const handleCompleteSale = () => {
      if (cart.length === 0) {
          toast.error("Cannot complete sale with an empty cart.");
          return;
      }
      toast.success("Sale completed successfully!");
      // Reset state for next sale
      setCart([]);
      setCouponCode("");
      setDiscount(0);
      setCustomerPhone("");
      setSearchTerm("");
  };

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
                  <BreadcrumbPage>New Sale</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 lg:flex-row">
          {/* Left Column: Customer & Product Catalog */}
          <div className="flex-1 lg:w-3/5 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/>Customer Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <Input className='mt-5' id="customer-phone" placeholder="Optional customer phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </CardContent>
            </Card>
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>Product Catalog</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground mt-3" />
                  <Input type="search" placeholder="Search by name or category to add products..." className="w-full pl-8 mt-3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                {searchTerm.length > 0 ? (
                    <div className="space-y-2">
                        {filteredProducts.length > 0 ? filteredProducts.map(product => (
                            <div key={product.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}  ·  <span className="font-mono text-xs">{product.stock} in stock</span></p>
                                </div>
                                <Button size="sm" onClick={() => handleProductSelect(product)} disabled={product.stock === 0}>
                                    <Plus className="mr-2 h-4 w-4"/> Add
                                </Button>
                            </div>
                        )) : <p className="text-center text-muted-foreground py-8">No products found.</p>}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
                        <PackagePlus className="mx-auto h-12 w-12" />
                        <p className="mt-2">Start typing to search for products.</p>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Cart & Checkout */}
          <div className="flex-1 lg:w-2/5">
            <Card className="sticky top-6 flex-1 flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Current Sale
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleUpdateQuantity(item.id, 'decrement')}><Minus className="h-3 w-3" /></Button>
                          <span className="w-6 text-center font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleUpdateQuantity(item.id, 'increment')}><Plus className="h-3 w-3" /></Button>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => handleRemoveFromCart(item.id)}><X className="h-4 w-4" /></Button>
                      </div>
                    ))
                  )}
                </div>
                <Separator />
                <div className="space-y-2">
                    <Label htmlFor="coupon-code">Discount Coupon</Label>
                    <div className="flex gap-2">
                        <Input id="coupon-code" placeholder="e.g., SAVE10" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        <Button onClick={handleApplyCoupon} variant="secondary">Apply</Button>
                    </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-auto">
                <div className="w-full space-y-1 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    {discount > 0 && (<div className="flex justify-between text-muted-foreground"><span>Discount ({discount * 100}%)</span><span>-${discountAmount.toFixed(2)}</span></div>)}
                    <Separator className="my-2"/>
                    <div className="flex justify-between font-bold text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <Button className="w-full text-lg" size="lg" onClick={handleCompleteSale}>Complete Sale</Button>
              </CardFooter>
            </Card>
          </div>
        </main>

        {/* Quantity Dialog */}
        <Dialog open={isQuantityDialogOpen} onOpenChange={setIsQuantityDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add to Cart: {selectedProduct?.name}</DialogTitle>
                    <DialogDescription>
                        Specify the quantity you want to add. 
                        There are {selectedProduct?.stock} units available.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" min="1" max={selectedProduct?.stock} value={quantityToAdd} onChange={(e) => setQuantityToAdd(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsQuantityDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
