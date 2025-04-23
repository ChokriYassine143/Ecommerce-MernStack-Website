import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useWishlist } from "@/contexts/WishlistContext";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useShoppingCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });
    toast.success(`${item.name} added to cart`);
  };

  const moveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description
      });
    });
    toast.success("All items added to cart");
    clearWishlist();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          
          {wishlist.length > 0 && (
            <div className="flex space-x-4">
              <Button variant="outline" onClick={clearWishlist} className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4" /> Clear Wishlist
              </Button>
              <Button onClick={moveAllToCart} className="flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add All to Cart
              </Button>
            </div>
          )}
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border shadow-sm overflow-hidden group">
                <div className="aspect-square relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2 text-gray-900">{item.name}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-4">${item.price.toFixed(2)}</p>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleAddToCart(item)} 
                      className="flex-1 flex items-center justify-center"
                      variant="secondary"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-3 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border shadow-sm">
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">
              Save your favorite items to find them easily later.
            </p>
            <Button asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default WishlistPage;
