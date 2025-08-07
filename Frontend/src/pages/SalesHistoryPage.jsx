import { useState } from "react";
import { List, Package, User, DollarSign } from "lucide-react";

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
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

// --- MOCK SALES HISTORY DATA ---
const createMockSalesHistory = () => {
  const history = [];
  const products = [
    { id: "PROD-001", name: "Premium Wireless Mouse", price: 75.50 },
    { id: "PROD-002", name: "Mechanical Keyboard", price: 120.00 },
    { id: "PROD-003", name: "Organic Cotton T-Shirt", price: 25.00 },
    { id: "PROD-004", name: "Stainless Steel Water Bottle", price: 15.99 },
  ];
  for (let i = 0; i < 120; i++) {
    const product = products[i % products.length];
    const quantitySold = Math.floor(Math.random() * 5) + 1;
    history.push({
      id: `SALE-${String(Date.now()).slice(-6)}-${i}`,
      productName: product.name,
      quantitySold: quantitySold,
      totalAmount: product.price * quantitySold,
      customerPhone: `+1-555-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 8).toISOString(), // Transactions every 8 hours
    });
  }
  return history;
};

const salesHistoryData = createMockSalesHistory();

export default function SalesHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Pagination logic
  const totalPages = Math.ceil(salesHistoryData.length / itemsPerPage);
  const paginatedHistory = salesHistoryData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
                  <BreadcrumbPage>Sales History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Sales Transaction History
              </CardTitle>
              <CardDescription>
                A log of all completed sales transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Total Amount</TableHead>
                    <TableHead className="text-right">Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            {entry.productName}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {entry.customerPhone}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{entry.quantitySold}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        <div className="flex items-center justify-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            {entry.totalAmount.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(entry.date).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Showing{" "}
                  <strong>
                    {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, salesHistoryData.length)}
                  </strong>{" "}
                  of <strong>{salesHistoryData.length}</strong> entries
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePreviousPage(); }}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleNextPage(); }}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
