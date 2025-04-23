
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { Trash2, Plus, Minus, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useShoppingCart();
  const [promoCode, setPromoCode] = useState("");

  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const discount = 0; // Would be calculated based on applied promo codes
  const total = subtotal + shipping - discount;

  // Handle quantity updates
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  // Handle promo code submission
  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement promo code logic here
    setPromoCode("");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Items in Your Cart</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Clear Cart
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-0">
                        <div className="w-20 h-20 rounded bg-gray-100 flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        
                        <div className="sm:ml-6 flex-grow">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.description && item.description.substring(0, 50)}...
                          </p>
                          
                          <div className="flex flex-wrap items-center justify-between mt-4">
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                              <span className="font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <form onSubmit={applyPromoCode} className="pt-4">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button type="submit" variant="outline">Apply</Button>
                    </div>
                  </form>
                  
                  <Button asChild className="w-full mt-6">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border shadow-sm">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default CartPage;
