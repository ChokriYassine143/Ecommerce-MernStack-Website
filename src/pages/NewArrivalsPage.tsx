
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { tag, calendar } from "lucide-react";

// Mock new arrivals data
const mockNewArrivals = [
  {
    id: "category1",
    name: "Home & Kitchen",
    products: [
      {
        id: "na1",
        name: "Bamboo Dish Rack",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Sustainable bamboo dish drying rack with water collection tray",
        dateAdded: "2025-04-18",
        category: "Home & Kitchen"
      },
      {
        id: "na2",
        name: "Recycled Glass Storage Jars (Set of 3)",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1546550879-3b71f2427ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Airtight storage jars made from recycled glass",
        dateAdded: "2025-04-17",
        category: "Home & Kitchen"
      },
      {
        id: "na3",
        name: "Organic Cotton Table Runner",
        price: 22.99,
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Elegant hand-woven table runner made from GOTS-certified organic cotton",
        dateAdded: "2025-04-15",
        category: "Home & Kitchen"
      },
    ]
  },
  {
    id: "category2",
    name: "Personal Care",
    products: [
      {
        id: "na4",
        name: "Biodegradable Bamboo Toothbrushes (Pack of 4)",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Medium-bristle bamboo toothbrushes with charcoal-infused bristles",
        dateAdded: "2025-04-19",
        category: "Personal Care"
      },
      {
        id: "na5",
        name: "Natural Deodorant Stick",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Aluminum-free deodorant made with coconut oil and essential oils",
        dateAdded: "2025-04-16",
        category: "Personal Care"
      },
    ]
  },
  {
    id: "category3",
    name: "Fashion",
    products: [
      {
        id: "na6",
        name: "Recycled Plastic Backpack",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Durable backpack made from 25 recycled plastic bottles",
        dateAdded: "2025-04-20",
        category: "Fashion"
      },
      {
        id: "na7",
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Soft, breathable t-shirt made from 100% organic cotton",
        dateAdded: "2025-04-14",
        category: "Fashion"
      },
      {
        id: "na8",
        name: "Hemp Wallet",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        description: "Slim, minimalist wallet made from sustainable hemp fabric",
        dateAdded: "2025-04-12",
        category: "Fashion"
      },
    ]
  }
];

const NewArrivalsPage = () => {
  const { addToCart } = useShoppingCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [selectedTab, setSelectedTab] = useState(mockNewArrivals[0].id);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };
  
  const handleAddToWishlist = (product: any) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Added today";
    } else if (diffDays === 1) {
      return "Added yesterday";
    } else {
      return `Added ${diffDays} days ago`;
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
          <p className="text-gray-600">Check out our latest eco-friendly products</p>
        </div>
        
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            {mockNewArrivals.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {mockNewArrivals.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-64">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 text-white">New</Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant="outline" 
                          className="bg-white text-gray-700 flex items-center"
                        >
                          <calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(product.dateAdded)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-500 line-clamp-2 mt-1 text-sm">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant={isInWishlist(product.id) ? "default" : "outline"}
                            onClick={() => handleAddToWishlist(product)}
                          >
                            {isInWishlist(product.id) ? "Saved" : "Save"}
                          </Button>
                          <Button size="sm" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NewArrivalsPage;
