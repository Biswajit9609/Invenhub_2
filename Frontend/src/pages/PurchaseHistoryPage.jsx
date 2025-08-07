import { useState } from "react";
import { List, Package } from "lucide-react";

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

// --- MOCK PURCHASE HISTORY DATA ---
// In a real application, this would come from a database.
const createMockHistory = () => {
  const history = [];
  const products = [
    { id: "PROD-001", name: "Premium Wireless Mouse" },
    { id: "PROD-002", name: "Mechanical Keyboard" },
    { id: "PROD-003", name: "Organic Cotton T-Shirt" },
    { id: "PROD-004", name: "Stainless Steel Water Bottle" },
  ];
  for (let i = 0; i < 85; i++) {
    const product = products[i % products.length];
    history.push({
      id: `PUR-${String(Date.now()).slice(-6)}-${i}`,
      productName: product.name,
      quantityAdded: Math.floor(Math.random() * 50) + 10,
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 12).toISOString(), // Transactions every 12 hours
    });
  }
  return history;
};

const purchaseHistoryData = createMockHistory();

export default function PurchaseHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Pagination logic
  const totalPages = Math.ceil(purchaseHistoryData.length / itemsPerPage);
  const paginatedHistory = purchaseHistoryData.slice(
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
                  <BreadcrumbPage>Purchase History</BreadcrumbPage>
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
                Stock Addition History
              </CardTitle>
              <CardDescription>
                A log of all products and quantities added to the inventory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-center">Quantity Added</TableHead>
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
                      <TableCell className="text-center">
                        <Badge variant="secondary">+{entry.quantityAdded}</Badge>
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
                    {Math.min(currentPage * itemsPerPage, purchaseHistoryData.length)}
                  </strong>{" "}
                  of <strong>{purchaseHistoryData.length}</strong> entries
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