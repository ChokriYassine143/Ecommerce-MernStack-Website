
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { tag, calendar, edit, trash, plus } from "lucide-react";
import { toast } from "sonner";

// Mock categories
const categories = [
  "Home & Kitchen",
  "Personal Care",
  "Fashion",
  "Zero Waste",
  "Food & Beverage",
  "Outdoor"
];

// Mock products
const initialProducts = [
  {
    id: "na1",
    name: "Bamboo Dish Rack",
    description: "Sustainable bamboo dish drying rack with water collection tray",
    price: 34.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    dateAdded: new Date("2025-04-18").toISOString(),
    featured: true,
    inStock: true
  },
  {
    id: "na2",
    name: "Recycled Glass Storage Jars (Set of 3)",
    description: "Airtight storage jars made from recycled glass",
    price: 29.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1546550879-3b71f2427ae3",
    dateAdded: new Date("2025-04-17").toISOString(),
    featured: false,
    inStock: true
  },
  {
    id: "na4",
    name: "Biodegradable Bamboo Toothbrushes (Pack of 4)",
    description: "Medium-bristle bamboo toothbrushes with charcoal-infused bristles",
    price: 12.99,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6",
    dateAdded: new Date("2025-04-19").toISOString(),
    featured: true,
    inStock: true
  },
  {
    id: "na6",
    name: "Recycled Plastic Backpack",
    description: "Durable backpack made from 25 recycled plastic bottles",
    price: 89.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601",
    dateAdded: new Date("2025-04-20").toISOString(),
    featured: true,
    inStock: true
  }
];

function AdminNewArrivals() {
  const [products, setProducts] = useState(initialProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: categories[0],
    image: "",
    dateAdded: new Date(),
    featured: false,
    inStock: true
  });

  const filteredProducts = filterCategory === "all" 
    ? products 
    : products.filter(product => product.category === filterCategory);

  const handleAddNewClick = () => {
    setFormData({
      id: `na${products.length + 1}`,
      name: "",
      description: "",
      price: "",
      category: categories[0],
      image: "",
      dateAdded: new Date(),
      featured: false,
      inStock: true
    });
    setIsAddProductOpen(true);
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      ...product,
      dateAdded: new Date(product.dateAdded),
      price: product.price.toString()
    });
    setIsEditProductOpen(true);
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteProductOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        dateAdded: date
      });
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      dateAdded: formData.dateAdded.toISOString()
    };
    
    setProducts([...products, newProduct]);
    setIsAddProductOpen(false);
    toast.success("New product added successfully");
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(product => 
      product.id === selectedProduct.id 
        ? {
            ...formData,
            price: parseFloat(formData.price),
            dateAdded: formData.dateAdded.toISOString()
          } 
        : product
    );
    
    setProducts(updatedProducts);
    setIsEditProductOpen(false);
    toast.success("Product updated successfully");
  };

  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setIsDeleteProductOpen(false);
    toast.success("Product deleted successfully");
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d, yyyy");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage New Arrivals</h1>
        <Button onClick={handleAddNewClick}>
          <plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Additions</h2>
          <div className="flex items-center space-x-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(product.dateAdded)}</TableCell>
                  <TableCell>
                    {product.featured ? (
                      <div className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Featured
                      </div>
                    ) : (
                      <div className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Standard
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEditClick(product)}>
                      <edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(product)}>
                      <trash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your new arrivals collection.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Bamboo Dish Rack"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                placeholder="Brief description of the product"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 29.99"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="e.g. https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Date Added</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateAdded && "text-muted-foreground"
                    )}
                  >
                    <calendar className="mr-2 h-4 w-4" />
                    {formData.dateAdded ? format(formData.dateAdded, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateAdded}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Product</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="inStock">In Stock</Label>
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details of this product.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input
                id="edit-price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Date Added</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateAdded && "text-muted-foreground"
                    )}
                  >
                    <calendar className="mr-2 h-4 w-4" />
                    {formData.dateAdded ? format(formData.dateAdded, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateAdded}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-featured">Featured Product</Label>
                <Switch
                  id="edit-featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-inStock">In Stock</Label>
                <Switch
                  id="edit-inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="py-4">
              <p className="font-medium">{selectedProduct.name}</p>
              <p className="text-sm text-gray-500">{selectedProduct.description}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminNewArrivals;
