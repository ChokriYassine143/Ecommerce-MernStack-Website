
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Package, ShoppingBag, Heart, Settings, LogOut, User, Lock, Edit } from "lucide-react";

// Mock orders for display
const mockOrders = [
  {
    id: "10023",
    date: "April 12, 2025",
    total: 89.94,
    status: "Delivered",
    items: 3
  },
  {
    id: "10019",
    date: "March 28, 2025",
    total: 124.50,
    status: "Shipped",
    items: 5
  },
  {
    id: "10015",
    date: "March 10, 2025",
    total: 43.95,
    status: "Delivered",
    items: 2
  }
];

function AccountPage() {
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Profile updated successfully");
    }, 1500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user?.photoURL as string || undefined} />
                    <AvatarFallback>{profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{profileData.firstName} {profileData.lastName}</CardTitle>
                    <CardDescription className="text-sm">{profileData.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <nav className="grid">
                  <Button 
                    variant={activeTab === "profile" ? "secondary" : "ghost"} 
                    className="justify-start px-4 h-12" 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "orders" ? "secondary" : "ghost"} 
                    className="justify-start px-4 h-12" 
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === "wishlist" ? "secondary" : "ghost"} 
                    className="justify-start px-4 h-12" 
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "secondary" : "ghost"} 
                    className="justify-start px-4 h-12" 
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
              
              <CardFooter className="pt-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Manage your account details and personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Button className="mt-6" type="submit" disabled={isUpdating}>
                      {isUpdating ? "Saving Changes..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>
                    View and track your recent orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockOrders.length > 0 ? (
                    <div className="divide-y">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <p className="font-medium flex items-center">
                              <Package className="mr-2 h-4 w-4" />
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                            <div className="mt-1 text-sm">
                              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {order.status}
                              </span>
                              <span className="ml-2 text-gray-600">{order.items} items</span>
                            </div>
                          </div>
                          <div className="flex items-center mt-3 sm:mt-0">
                            <span className="font-medium mr-4">${order.total.toFixed(2)}</span>
                            <Button size="sm" asChild>
                              <Link to={`/track-order/${order.id}`}>View Order</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">No orders yet</h3>
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Button asChild>
                        <Link to="/shop">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your Wishlist</CardTitle>
                      <CardDescription>
                        Products you've saved for later
                      </CardDescription>
                    </div>
                    <Button asChild size="sm">
                      <Link to="/wishlist">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-1">Manage your wishlist</h3>
                    <p className="text-gray-500 mb-4">View and manage all your saved items in one place.</p>
                    <Button asChild>
                      <Link to="/wishlist">Go to Wishlist</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="password">
                    <TabsList className="mb-4">
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="password">
                      <form onSubmit={handleChangePassword}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" required />
                          </div>
                          
                          <Button type="submit">Update Password</Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="notifications">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Order Updates</h3>
                            <p className="text-sm text-gray-500">Receive updates about your orders</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="order-email" className="text-sm">Email</Label>
                            <input type="checkbox" id="order-email" className="checkbox" defaultChecked />
                            <Label htmlFor="order-sms" className="text-sm">SMS</Label>
                            <input type="checkbox" id="order-sms" className="checkbox" />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Promotions & Discounts</h3>
                            <p className="text-sm text-gray-500">Get notified about sales and special offers</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="promo-email" className="text-sm">Email</Label>
                            <input type="checkbox" id="promo-email" className="checkbox" defaultChecked />
                            <Label htmlFor="promo-sms" className="text-sm">SMS</Label>
                            <input type="checkbox" id="promo-sms" className="checkbox" />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Account Activity</h3>
                            <p className="text-sm text-gray-500">Get security alerts and account updates</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="account-email" className="text-sm">Email</Label>
                            <input type="checkbox" id="account-email" className="checkbox" defaultChecked />
                          </div>
                        </div>
                        
                        <Button>Save Preferences</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="privacy">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Data Sharing</h3>
                            <p className="text-sm text-gray-500">Allow us to share your data with partners</p>
                          </div>
                          <input type="checkbox" className="checkbox" />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Cookies</h3>
                            <p className="text-sm text-gray-500">Manage cookie preferences</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Manage
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Delete Account</h3>
                          <p className="text-sm text-gray-500">
                            Permanently delete your account and all your data. This action cannot be undone.
                          </p>
                          <Button variant="destructive" size="sm">
                            <Lock className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AccountPage;
