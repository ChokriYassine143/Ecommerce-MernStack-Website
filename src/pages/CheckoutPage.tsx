
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CreditCard, Check } from "lucide-react";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      clearCart();
      setIsLoading(false);
      
      // Show success message and redirect
      toast.success("Your order has been placed successfully!");
      navigate(`/track-order/${orderNumber}`);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  {/* Customer Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" required />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip/Postal Code</Label>
                          <Input id="zip" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-md mb-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Credit or Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-md">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === "credit-card" && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">Security Code (CVV)</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded bg-gray-100 mr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-100 text-sm">
                  <div className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>All orders are shipped in eco-friendly packaging and carbon-neutral delivery.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border shadow-sm">
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some items to your cart to check out.</p>
            <Button asChild>
              <a href="/shop">Shop Now</a>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default CheckoutPage;
