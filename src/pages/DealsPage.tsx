import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { Tag, Star, Info } from "lucide-react";

const mockDeals = [
  {
    id: "deal1",
    title: "Earth Day Special",
    description: "Save 20% on all eco-friendly kitchen products",
    discount: "20%",
    code: "EARTH20",
    validUntil: "2025-04-30",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    products: [
      {
        id: "p1",
        name: "Bamboo Cutlery Set",
        price: 19.99,
        discountedPrice: 15.99,
        image: "https://images.unsplash.com/photo-1584577528786-5880ce3e2ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "p2",
        name: "Reusable Silicone Food Bags",
        price: 15.99,
        discountedPrice: 12.79,
        image: "https://images.unsplash.com/photo-1611486212355-d276af4581c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      }
    ]
  },
  {
    id: "deal2",
    title: "Summer Ready Bundle",
    description: "Get 30% off when you buy any 3 summer products",
    discount: "30%",
    code: "SUMMER30",
    validUntil: "2025-06-15",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    products: [
      {
        id: "p3",
        name: "Recycled Plastic Beach Towel",
        price: 29.99,
        discountedPrice: 20.99,
        image: "https://images.unsplash.com/photo-1531099668679-de63402bf7d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "p4",
        name: "Plant-based Sunscreen",
        price: 14.99,
        discountedPrice: 10.49,
        image: "https://images.unsplash.com/photo-1584949514490-73fc1a2faa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      }
    ]
  },
  {
    id: "deal3",
    title: "Home Essentials Sale",
    description: "Get 15% off all sustainable home products",
    discount: "15%",
    code: "HOME15",
    validUntil: "2025-05-20",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    products: [
      {
        id: "p5",
        name: "Organic Cotton Bedsheets",
        price: 79.99,
        discountedPrice: 67.99,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "p6",
        name: "Zero Waste Cleaning Kit",
        price: 49.99,
        discountedPrice: 42.49,
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      }
    ]
  }
];

const DealsPage = () => {
  const { addToCart } = useShoppingCart();
  const { addToWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState("");
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    
    const validCoupons = mockDeals.map(deal => deal.code);
    if (validCoupons.includes(couponCode.trim().toUpperCase())) {
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.image,
      description: product.description
    });
  };
  
  const handleAddToWishlist = (product: any) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.image,
      description: product.description
    });
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Deals & Discounts</h1>
            <p className="text-gray-600">Save on eco-friendly products with our special offers</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex max-w-sm">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleApplyCoupon}>Apply</Button>
          </div>
        </div>
        
        <div className="space-y-10">
          {mockDeals.map(deal => (
            <div key={deal.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white text-lg px-3 py-1.5 font-semibold">
                      {deal.discount} OFF
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{deal.title}</h2>
                      <p className="text-gray-600">{deal.description}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:ml-4 md:text-right">
                      <p className="text-sm text-gray-500">Use code: <span className="font-mono font-bold text-black">{deal.code}</span></p>
                      <p className="text-sm text-gray-500">Valid until {formatDate(deal.validUntil)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {deal.products.map(product => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="flex h-full">
                          <div className="w-24 h-24 shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4 flex flex-col justify-between flex-1">
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <div className="flex items-center mt-1">
                                <span className="text-red-600 font-medium">${product.discountedPrice.toFixed(2)}</span>
                                <span className="text-gray-500 text-sm line-through ml-2">${product.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="flex mt-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="mr-2"
                                onClick={() => handleAddToWishlist(product)}
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <div className="shrink-0 mr-3">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">How to use discount codes</h3>
              <p className="text-sm text-blue-600 mt-1">
                Simply add the products to your cart and enter the discount code at checkout to apply the savings. Discounts cannot be combined with other offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DealsPage;
