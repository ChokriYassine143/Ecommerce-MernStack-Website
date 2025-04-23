
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useShoppingCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setIsLoading(false);
    }, 600);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className={cn("group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow", className)}>
      {/* Product Image with Wishlist Button */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full product-card-zoom"
          />
        </Link>
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm"
          onClick={toggleWishlist}
        >
          <Heart
            className={cn("h-5 w-5", 
              inWishlist ? "fill-red-500 text-red-500" : "fill-transparent text-gray-600"
            )}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
        <Link to={`/product/${product.id}`} className="group-hover:text-brand-green-600 transition-colors">
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <Button 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
