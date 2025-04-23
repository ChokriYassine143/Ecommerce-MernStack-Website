import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const OrderTrackingPage = () => {
  const { id: orderIdFromParams } = useParams();
  const [orderId, setOrderId] = useState(orderIdFromParams || "");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");

  const mockTrackingData = {
    orderId: "ORD12345",
    status: "Shipped",
    estimatedDelivery: "2024-05-05",
    events: [
      {
        date: "2024-04-28",
        time: "14:00",
        location: "Shipping Center A",
        status: "Package received"
      },
      {
        date: "2024-04-29",
        time: "09:00",
        location: "Transit Hub B",
        status: "In transit"
      },
      {
        date: "2024-04-30",
        time: "18:00",
        location: "Local Delivery Office C",
        status: "Out for delivery"
      }
    ]
  };

  const handleTrackOrder = () => {
    if (!orderId.trim()) {
      setError("Please enter a valid order ID.");
      setTrackingData(null);
      return;
    }

    // Mock API call
    setTimeout(() => {
      if (orderId.toUpperCase() === mockTrackingData.orderId) {
        setTrackingData(mockTrackingData);
        setError("");
      } else {
        setError("Order ID not found. Please check your order ID and try again.");
        setTrackingData(null);
      }
    }, 500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
        
        <div className="flex items-center mb-6">
          <Input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleTrackOrder}>
            <Search className="h-4 w-4 mr-2" />
            Track
          </Button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {trackingData && (
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Information</h2>
              <div className="mb-4">
                <strong>Order ID:</strong> {trackingData.orderId}
              </div>
              <div className="mb-4">
                <strong>Status:</strong> {trackingData.status}
              </div>
              <div className="mb-4">
                <strong>Estimated Delivery:</strong> {trackingData.estimatedDelivery}
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Tracking History</h3>
              <div className="space-y-3">
                {trackingData.events.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24">
                      {event.date} - {event.time}
                    </div>
                    <div className="w-40">{event.location}</div>
                    <div>{event.status}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default OrderTrackingPage;
