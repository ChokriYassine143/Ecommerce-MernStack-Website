import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tag, Calendar as CalendarIcon, Edit, Trash, X, Plus } from "lucide-react";
import { toast } from "sonner";

const initialDeals = [
  {
    id: "deal1",
    title: "Earth Day Special",
    description: "Save 20% on all eco-friendly kitchen products",
    discount: "20%",
    code: "EARTH20",
    startDate: new Date("2025-04-15").toISOString(),
    endDate: new Date("2025-04-30").toISOString(),
    isActive: true,
    products: [
      "Bamboo Cutlery Set",
      "Reusable Silicone Food Bags"
    ]
  },
  {
    id: "deal2",
    title: "Summer Ready Bundle",
    description: "Get 30% off when you buy any 3 summer products",
    discount: "30%",
    code: "SUMMER30",
    startDate: new Date("2025-05-01").toISOString(),
    endDate: new Date("2025-06-15").toISOString(),
    isActive: true,
    products: [
      "Recycled Plastic Beach Towel",
      "Plant-based Sunscreen"
    ]
  },
  {
    id: "deal3",
    title: "Home Essentials Sale",
    description: "Get 15% off all sustainable home products",
    discount: "15%",
    code: "HOME15",
    startDate: new Date("2025-05-10").toISOString(),
    endDate: new Date("2025-05-20").toISOString(),
    isActive: false,
    products: [
      "Organic Cotton Bedsheets",
      "Zero Waste Cleaning Kit"
    ]
  }
];

function AdminDeals() {
  const [deals, setDeals] = useState(initialDeals);
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [isEditDealOpen, setIsEditDealOpen] = useState(false);
  const [isDeleteDealOpen, setIsDeleteDealOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    discount: "",
    code: "",
    startDate: new Date(),
    endDate: new Date(),
    isActive: true,
    products: ""
  });

  const handleAddNewClick = () => {
    setFormData({
      id: `deal${deals.length + 1}`,
      title: "",
      description: "",
      discount: "",
      code: "",
      startDate: new Date(),
      endDate: new Date(),
      isActive: true,
      products: ""
    });
    setIsAddDealOpen(true);
  };

  const handleEditClick = (deal: any) => {
    setSelectedDeal(deal);
    setFormData({
      ...deal,
      startDate: new Date(deal.startDate),
      endDate: new Date(deal.endDate),
      products: deal.products.join(", ")
    });
    setIsEditDealOpen(true);
  };

  const handleDeleteClick = (deal: any) => {
    setSelectedDeal(deal);
    setIsDeleteDealOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked
    });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        startDate: date
      });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        endDate: date
      });
    }
  };

  const handleAddDeal = () => {
    const newDeal = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      products: formData.products.split(",").map(p => p.trim()).filter(p => p)
    };
    
    setDeals([...deals, newDeal]);
    setIsAddDealOpen(false);
    toast.success("New deal added successfully");
  };

  const handleUpdateDeal = () => {
    const updatedDeals = deals.map(deal => 
      deal.id === selectedDeal.id 
        ? {
            ...formData,
            startDate: formData.startDate.toISOString(),
            endDate: formData.endDate.toISOString(),
            products: formData.products.split(",").map(p => p.trim()).filter(p => p)
          } 
        : deal
    );
    
    setDeals(updatedDeals);
    setIsEditDealOpen(false);
    toast.success("Deal updated successfully");
  };

  const handleDeleteDeal = () => {
    const updatedDeals = deals.filter(deal => deal.id !== selectedDeal.id);
    setDeals(updatedDeals);
    setIsDeleteDealOpen(false);
    toast.success("Deal deleted successfully");
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d, yyyy");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Deals & Discounts</h1>
        <Button onClick={handleAddNewClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Deal
        </Button>
      </div>

      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map(deal => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{deal.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">{deal.discount}</div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{deal.code}</code>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(deal.startDate)} - {formatDate(deal.endDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex px-2 py-1 rounded text-xs font-medium ${deal.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {deal.isActive ? "Active" : "Inactive"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEditClick(deal)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(deal)}>
                      <Trash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {deals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No deals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
            <DialogDescription>
              Create a new promotional deal or discount.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Summer Sale"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g. SUMMER20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount">Discount Amount</Label>
              <Input
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="e.g. 20%"
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="isActive">Active Status</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                placeholder="Brief description of the deal"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="products">Products (comma separated)</Label>
              <Textarea
                id="products"
                name="products"
                value={formData.products}
                onChange={handleInputChange}
                rows={2}
                placeholder="e.g. Bamboo Toothbrush, Reusable Water Bottle"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDealOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDeal}>Add Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDealOpen} onOpenChange={setIsEditDealOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
            <DialogDescription>
              Update the details of this promotional deal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-code">Promo Code</Label>
              <Input
                id="edit-code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-discount">Discount Amount</Label>
              <Input
                id="edit-discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="edit-isActive">Active Status</Label>
              <Switch
                id="edit-isActive"
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-products">Products (comma separated)</Label>
              <Textarea
                id="edit-products"
                name="products"
                value={formData.products}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDealOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDeal}>Update Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDealOpen} onOpenChange={setIsDeleteDealOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Deal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this deal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDeal && (
            <div className="py-4">
              <p className="font-medium">{selectedDeal.title}</p>
              <p className="text-sm text-gray-500">{selectedDeal.description}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDealOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteDeal}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminDeals;
