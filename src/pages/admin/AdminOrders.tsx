
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Eye, FileDown } from "lucide-react";
import { toast } from "sonner";

// Mock order data
const mockOrders = [
  {
    id: "ORD10023",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com"
    },
    date: "2025-04-12",
    total: 89.94,
    status: "delivered",
    paymentStatus: "paid",
    items: [
      { id: "1", name: "Bamboo Toothbrush", price: 4.99, quantity: 2 },
      { id: "2", name: "Reusable Water Bottle", price: 24.99, quantity: 1 },
      { id: "3", name: "Organic Cotton Tote Bag", price: 14.99, quantity: 3 }
    ],
    shippingAddress: {
      street: "123 Eco Street",
      city: "Green City",
      state: "Nature State",
      zipCode: "12345",
      country: "United States"
    }
  },
  {
    id: "ORD10022",
    customer: {
      name: "Jane Doe",
      email: "jane.doe@example.com"
    },
    date: "2025-04-10",
    total: 64.95,
    status: "shipped",
    paymentStatus: "paid",
    items: [
      { id: "4", name: "Beeswax Wraps", price: 18.99, quantity: 1 },
      { id: "5", name: "Reusable Straws", price: 12.99, quantity: 2 }
    ],
    shippingAddress: {
      street: "456 Sustainability Ave",
      city: "Eco Town",
      state: "Clean State",
      zipCode: "67890",
      country: "United States"
    }
  },
  {
    id: "ORD10021",
    customer: {
      name: "Robert Johnson",
      email: "robert.j@example.com"
    },
    date: "2025-04-08",
    total: 129.97,
    status: "processing",
    paymentStatus: "pending",
    items: [
      { id: "6", name: "Solar Power Bank", price: 49.99, quantity: 1 },
      { id: "7", name: "Recycled Paper Notebook", price: 8.99, quantity: 2 },
      { id: "8", name: "Bamboo Cutlery Set", price: 21.99, quantity: 2 }
    ],
    shippingAddress: {
      street: "789 Green Living Rd",
      city: "Sustainable City",
      state: "Eco State",
      zipCode: "54321",
      country: "United States"
    }
  },
  {
    id: "ORD10020",
    customer: {
      name: "Sarah Williams",
      email: "sarah.w@example.com"
    },
    date: "2025-04-05",
    total: 74.95,
    status: "cancelled",
    paymentStatus: "refunded",
    items: [
      { id: "9", name: "Organic Cotton Sheets", price: 74.95, quantity: 1 }
    ],
    shippingAddress: {
      street: "101 Conscious St",
      city: "Eco Springs",
      state: "Green State",
      zipCode: "12121",
      country: "United States"
    }
  },
  {
    id: "ORD10019",
    customer: {
      name: "Michael Brown",
      email: "michael.b@example.com"
    },
    date: "2025-04-03",
    total: 124.50,
    status: "delivered",
    paymentStatus: "paid",
    items: [
      { id: "10", name: "Zero Waste Starter Kit", price: 89.99, quantity: 1 },
      { id: "11", name: "Compostable Phone Case", price: 34.51, quantity: 1 }
    ],
    shippingAddress: {
      street: "202 Sustainable Way",
      city: "Clean City",
      state: "Pure State",
      zipCode: "34545",
      country: "United States"
    }
  }
];

function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditStatusOpen, setIsEditStatusOpen] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || statusFilter === "" ? true : order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleStatusClick = (order: any) => {
    setSelectedOrder(order);
    setIsEditStatusOpen(true);
  };

  const handleUpdateStatus = (newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    setIsEditStatusOpen(false);
    
    toast.success(`Order ${selectedOrder.id} status updated to ${newStatus}`);
  };

  const handleExportOrders = () => {
    toast.success("Orders exported successfully");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-amber-100 text-amber-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "refunded": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" onClick={handleExportOrders}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge 
                    className={`${getStatusBadgeVariant(order.status)} cursor-pointer`}
                    onClick={() => handleStatusClick(order)}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Order Date</Label>
                  <p className="font-medium">{formatDate(selectedOrder.date)}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <div>
                    <Badge className={getStatusBadgeVariant(selectedOrder.status)}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Payment Status</Label>
                  <div>
                    <Badge className={getPaymentStatusBadgeVariant(selectedOrder.paymentStatus)}>
                      {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Total Amount</Label>
                  <p className="font-medium">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Customer and Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-gray-600">{selectedOrder.customer.email}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                      <TableCell className="text-right font-medium">${selectedOrder.total.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  handleStatusClick(selectedOrder);
                }}>
                  Update Status
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={isEditStatusOpen} onOpenChange={setIsEditStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Current Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusBadgeVariant(selectedOrder.status)}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Customer</Label>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-status">New Status</Label>
                <Select defaultValue={selectedOrder.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing" onSelect={() => handleUpdateStatus("processing")}>
                      Processing
                    </SelectItem>
                    <SelectItem value="shipped" onSelect={() => handleUpdateStatus("shipped")}>
                      Shipped
                    </SelectItem>
                    <SelectItem value="delivered" onSelect={() => handleUpdateStatus("delivered")}>
                      Delivered
                    </SelectItem>
                    <SelectItem value="cancelled" onSelect={() => handleUpdateStatus("cancelled")}>
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditStatusOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminOrders;
