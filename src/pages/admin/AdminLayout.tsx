
import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ChevronRight, 
  ShoppingBag, 
  Users, 
  Package, 
  ChartBar, 
  Home, 
  Settings, 
  LogOut,
  Tag,
  Calendar,
  HelpCircle
} from "lucide-react";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [pageTitle, setPageTitle] = useState("Dashboard");

  // Redirect if user is not an admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  // Set page title based on current route
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "dashboard":
        setPageTitle("Dashboard");
        break;
      case "products":
        setPageTitle("Products");
        break;
      case "orders":
        setPageTitle("Orders");
        break;
      case "users":
        setPageTitle("Users");
        break;
      case "analytics":
        setPageTitle("Analytics");
        break;
      case "deals":
        setPageTitle("Deals & Discounts");
        break;
      case "new-arrivals":
        setPageTitle("New Arrivals");
        break;
      default:
        setPageTitle("Dashboard");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAdmin) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-start p-4">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-brand-green-600">EcoShop</span>
              <span className="ml-2 text-xs font-medium text-gray-500">ADMIN</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/dashboard" className="flex items-center">
                        <Home className="h-5 w-5 mr-3" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/products" className="flex items-center">
                        <Package className="h-5 w-5 mr-3" />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/orders" className="flex items-center">
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        <span>Orders</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/users" className="flex items-center">
                        <Users className="h-5 w-5 mr-3" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/deals" className="flex items-center">
                        <Tag className="h-5 w-5 mr-3" />
                        <span>Deals & Discounts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/new-arrivals" className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3" />
                        <span>New Arrivals</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/analytics" className="flex items-center">
                        <ChartBar className="h-5 w-5 mr-3" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/" className="flex items-center">
                        <Home className="h-5 w-5 mr-3" />
                        <span>Go to Store</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} className="flex items-center cursor-pointer">
                      <LogOut className="h-5 w-5 mr-3" />
                      <span>Log Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-medium">{pageTitle}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              {user && (
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm font-medium hidden sm:block">
                    {user.name}
                  </span>
                </div>
              )}
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
