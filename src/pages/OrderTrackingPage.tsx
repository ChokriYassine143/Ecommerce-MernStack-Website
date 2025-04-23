
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Check, Truck, Package, Home } from "lucide-react";

// Mock order status types
type OrderStatus = "processing" | "confirmed" | "shipped" | "out_for_delivery" | "delivered";

// Mock order data interface
interface OrderData {
  id: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulating API call to fetch order data
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (id) {
        // Mock data for demonstration
        const mockOrder: OrderData = {
          id,
          status: "shipped",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          shippingAddress: {
            name: "John Doe",
            street: "123 Eco Street",
            city: "Green City",
            state: "Nature State",
            zipCode: "12345"
          },
          items: [
            {
              id: "prod1",
              name: "Bamboo Toothbrush",
              price: 4.99,
              quantity: 2,
              image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            },
            {
              id: "prod2",
              name: "Reusable Water Bottle",
              price: 24.99,
              quantity: 1,
              image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            }
          ]
        };
        
        setOrder(mockOrder);
        setIsLoading(false);
      } else {
        setError("Invalid order ID");
        setIsLoading(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Calculate order progress percentage based on status
  const getProgressPercentage = (status: OrderStatus): number => {
    switch (status) {
      case "processing": return 10;
      case "confirmed": return 25;
      case "shipped": return 50;
      case "out_for_delivery": return 75;
      case "delivered": return 100;
      default: return 0;
    }
  };

  // Format date to readable string
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate subtotal
  const calculateSubtotal = (items: OrderData['items']) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mb-8 mx-auto"></div>
            <div className="h-48 bg-gray-200 rounded w-full max-w-md"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !order) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-8">{error || "Unable to find the order"}</p>
          <Button asChild>
            <a href="/account">Go to Your Account</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
          <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Status</h2>
          
          <div className="mb-6">
            <Progress value={getProgressPercentage(order.status)} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className={`text-center ${order.status === "processing" || order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "text-green-600" : "text-gray-400"}`}>
              <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 border-current mb-2">
                {order.status === "processing" || order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <p className="text-sm font-medium">Order Confirmed</p>
            </div>
            
            <div className={`text-center ${order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "text-green-600" : "text-gray-400"}`}>
              <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 border-current mb-2">
                {order.status === "confirmed" || order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <p className="text-sm font-medium">Processing</p>
            </div>
            
            <div className={`text-center ${order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? "text-green-600" : "text-gray-400"}`}>
              <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 border-current mb-2">
                {order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" ? <Package className="h-5 w-5" /> : "3"}
              </div>
              <p className="text-sm font-medium">Shipped</p>
            </div>
            
            <div className={`text-center ${order.status === "out_for_delivery" || order.status === "delivered" ? "text-green-600" : "text-gray-400"}`}>
              <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 border-current mb-2">
                {order.status === "out_for_delivery" || order.status === "delivered" ? <Truck className="h-5 w-5" /> : "4"}
              </div>
              <p className="text-sm font-medium">Out for Delivery</p>
            </div>
            
            <div className={`text-center ${order.status === "delivered" ? "text-green-600" : "text-gray-400"}`}>
              <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 border-current mb-2">
                {order.status === "delivered" ? <Home className="h-5 w-5" /> : "5"}
              </div>
              <p className="text-sm font-medium">Delivered</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-blue-700">
              <strong>Estimated delivery:</strong> {formatDate(order.estimatedDelivery)}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-start">
                    <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${calculateSubtotal(order.items).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(calculateSubtotal(order.items) * 0.07).toFixed(2)}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${(calculateSubtotal(order.items) + 5.99 + (calculateSubtotal(order.items) * 0.07)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please contact our customer support team.
              </p>
              <Button asChild variant="outline" className="w-full mb-2">
                <a href="/account">Order History</a>
              </Button>
              <Button asChild className="w-full">
                <a href="#contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default OrderTrackingPage;
