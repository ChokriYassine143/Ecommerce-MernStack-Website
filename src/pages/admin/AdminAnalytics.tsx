
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, CreditCard } from "lucide-react";

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 4000, orders: 240, customers: 125 },
  { month: 'Feb', sales: 3000, orders: 198, customers: 110 },
  { month: 'Mar', sales: 5000, orders: 275, customers: 150 },
  { month: 'Apr', sales: 7800, orders: 390, customers: 210 },
  { month: 'May', sales: 7300, orders: 350, customers: 180 },
  { month: 'Jun', sales: 8900, orders: 410, customers: 220 },
  { month: 'Jul', sales: 9800, orders: 450, customers: 240 },
  { month: 'Aug', sales: 11000, orders: 498, customers: 275 },
  { month: 'Sep', sales: 9300, orders: 405, customers: 235 },
  { month: 'Oct', sales: 8400, orders: 375, customers: 190 },
  { month: 'Nov', sales: 13000, orders: 590, customers: 310 },
  { month: 'Dec', sales: 16500, orders: 720, customers: 390 }
];

const categoryData = [
  { name: 'Home & Living', value: 35 },
  { name: 'Personal Care', value: 25 },
  { name: 'Clothing', value: 20 },
  { name: 'Food & Drinks', value: 15 },
  { name: 'Other', value: 5 }
];

const topProducts = [
  { name: 'Bamboo Toothbrush', sales: 1250, category: 'Personal Care' },
  { name: 'Reusable Water Bottle', sales: 1100, category: 'Home & Living' },
  { name: 'Organic Cotton Tote Bag', sales: 950, category: 'Clothing' },
  { name: 'Beeswax Wraps', sales: 870, category: 'Home & Living' },
  { name: 'Reusable Straws', sales: 810, category: 'Home & Living' }
];

const customerStats = [
  { name: 'New', value: 1250 },
  { name: 'Returning', value: 3200 }
];

// Colors for charts
const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("yearly");

  const getTimeFilteredData = (data: typeof salesData) => {
    if (timeRange === "yearly") return data;
    if (timeRange === "quarterly") return data.slice(-3);
    return data.slice(-1);
  };

  const filteredSalesData = getTimeFilteredData(salesData);

  // Calculate totals
  const totalSales = filteredSalesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalOrders = filteredSalesData.reduce((acc, curr) => acc + curr.orders, 0);
  const totalCustomers = filteredSalesData.reduce((acc, curr) => acc + curr.customers, 0);

  // Calculate growth (comparing with previous period)
  const calculateGrowth = (current: number, previous: number) => {
    return previous ? ((current - previous) / previous) * 100 : 0;
  };

  const getPreviousPeriodTotal = (data: typeof salesData, type: keyof (typeof salesData)[0]) => {
    if (timeRange === "yearly") {
      // No previous year in our mock data, so we'll just use a percentage
      return data.reduce((acc, curr) => acc + curr[type], 0) * 0.8;
    }
    if (timeRange === "quarterly") {
      return data.slice(-6, -3).reduce((acc, curr) => acc + curr[type], 0);
    }
    return data.slice(-2, -1)[0][type];
  };

  const salesGrowth = calculateGrowth(
    filteredSalesData.reduce((acc, curr) => acc + curr.sales, 0),
    getPreviousPeriodTotal(salesData, "sales")
  );

  const ordersGrowth = calculateGrowth(
    filteredSalesData.reduce((acc, curr) => acc + curr.orders, 0),
    getPreviousPeriodTotal(salesData, "orders")
  );

  const customersGrowth = calculateGrowth(
    filteredSalesData.reduce((acc, curr) => acc + curr.customers, 0),
    getPreviousPeriodTotal(salesData, "customers")
  );
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        
        <div className="w-48">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="quarterly">Last 3 Months</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <h3 className="text-2xl font-bold">${totalSales.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm ${salesGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {salesGrowth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span>{Math.abs(salesGrowth).toFixed(1)}% from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{totalOrders.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm ${ordersGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {ordersGrowth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span>{Math.abs(ordersGrowth).toFixed(1)}% from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <h3 className="text-2xl font-bold">{totalCustomers.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm ${customersGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {customersGrowth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span>{Math.abs(customersGrowth).toFixed(1)}% from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                <h3 className="text-2xl font-bold">
                  ${totalOrders ? (totalSales / totalOrders).toFixed(2) : "0.00"}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>2.3% from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Label className="text-lg font-medium">Sales Over Time</Label>
                <div className="h-80 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={filteredSalesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-lg font-medium">Sales by Category</Label>
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-lg font-medium">Top Products</Label>
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topProducts}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                        <Bar dataKey="sales" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardContent className="pt-6">
                <Label className="text-lg font-medium">Orders Over Time</Label>
                <div className="h-80 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredSalesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#3B82F6" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-lg font-medium">Customer Growth</Label>
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={filteredSalesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="customers" 
                          stroke="#8B5CF6" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-lg font-medium">Customer Types</Label>
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#8B5CF6" />
                          <Cell fill="#3B82F6" />
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Customers']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminAnalytics;
