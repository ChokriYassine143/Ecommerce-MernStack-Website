
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  discount?: number;
}

export const mockCategories = [
  "Home & Living",
  "Personal Care",
  "Clothing",
  "Food & Drinks",
  "Accessories",
  "Office Supplies"
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bamboo Toothbrush Set",
    category: "Personal Care",
    price: 12.99,
    description: "Set of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles for superior cleaning. Eco-friendly alternative to plastic toothbrushes.",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 50,
    rating: 4.8,
    reviews: 125,
    featured: true
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    description: "Made from 100% organic cotton, this t-shirt is soft, breathable, and produced using eco-friendly manufacturing processes.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 75,
    rating: 4.5,
    reviews: 89,
    discount: 10
  },
  {
    id: "3",
    name: "Reusable Produce Bags - 5 Pack",
    category: "Home & Living",
    price: 15.99,
    description: "Set of 5 washable mesh produce bags perfect for grocery shopping. Reduce plastic waste and keep your fruits and vegetables fresh longer.",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 100,
    rating: 4.9,
    reviews: 210,
    featured: true
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    category: "Food & Drinks",
    price: 24.99,
    description: "Double-walled, vacuum-insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 60,
    rating: 4.7,
    reviews: 175,
    featured: true
  },
  {
    id: "5",
    name: "Recycled Paper Notebook",
    category: "Office Supplies",
    price: 9.99,
    description: "Notebook made from 100% recycled paper with a hardcover made from sustainable materials. Perfect for journaling or note-taking.",
    image: "https://images.unsplash.com/photo-1531346680769-a372e5bf9d48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 120,
    rating: 4.4,
    reviews: 68
  },
  {
    id: "6",
    name: "Natural Soy Wax Candle",
    category: "Home & Living",
    price: 19.99,
    description: "Hand-poured soy wax candle with essential oils for a clean, non-toxic burn. Comes in a reusable glass jar with a wooden lid.",
    image: "https://images.unsplash.com/photo-1579461301594-9e7215eeca56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 45,
    rating: 4.6,
    reviews: 93,
    discount: 15
  },
  {
    id: "7",
    name: "Organic Lip Balm Set",
    category: "Personal Care",
    price: 14.99,
    description: "Set of 4 organic lip balms made with nourishing ingredients like shea butter and coconut oil. Cruelty-free and comes in biodegradable packaging.",
    image: "https://images.unsplash.com/photo-1575330933415-ce5a714cfc41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 80,
    rating: 4.3,
    reviews: 57
  },
  {
    id: "8",
    name: "Hemp Tote Bag",
    category: "Accessories",
    price: 34.99,
    description: "Durable tote bag made from sustainable hemp material. Perfect for grocery shopping or everyday use with reinforced handles and internal pockets.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    stock: 30,
    rating: 4.8,
    reviews: 112,
    featured: true
  }
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  orders: number;
  joined: string;
}

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "user",
    orders: 12,
    joined: "2023-01-15"
  },
  {
    id: "u2",
    name: "Michael Thompson",
    email: "michael.t@example.com",
    role: "user",
    orders: 5,
    joined: "2023-03-22"
  },
  {
    id: "u3",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    role: "user",
    orders: 8,
    joined: "2022-11-09"
  },
  {
    id: "u4",
    name: "David Wilson",
    email: "david.w@example.com",
    role: "user",
    orders: 3,
    joined: "2023-05-04"
  },
  {
    id: "u5",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    orders: 0,
    joined: "2022-01-01"
  }
];

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
}

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    customerId: "u1",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    date: "2023-06-12T10:30:00",
    status: "delivered",
    total: 64.97,
    items: [
      { id: "1", name: "Bamboo Toothbrush Set", quantity: 2, price: 12.99 },
      { id: "4", name: "Stainless Steel Water Bottle", quantity: 1, price: 24.99 },
      { id: "7", name: "Organic Lip Balm Set", quantity: 1, price: 14.99 }
    ],
    shippingAddress: {
      street: "123 Green St",
      city: "Eco City",
      state: "California",
      zipCode: "90001",
      country: "United States"
    },
    trackingNumber: "ECO123456789"
  },
  {
    id: "ord-002",
    customerId: "u2",
    customerName: "Michael Thompson",
    customerEmail: "michael.t@example.com",
    date: "2023-06-15T14:45:00",
    status: "shipped",
    total: 50.98,
    items: [
      { id: "3", name: "Reusable Produce Bags - 5 Pack", quantity: 1, price: 15.99 },
      { id: "6", name: "Natural Soy Wax Candle", quantity: 1, price: 19.99 },
      { id: "5", name: "Recycled Paper Notebook", quantity: 1, price: 9.99 }
    ],
    shippingAddress: {
      street: "456 Sustainable Ave",
      city: "Green Valley",
      state: "Oregon",
      zipCode: "97001",
      country: "United States"
    },
    trackingNumber: "ECO987654321"
  },
  {
    id: "ord-003",
    customerId: "u3",
    customerName: "Elena Rodriguez",
    customerEmail: "elena.r@example.com",
    date: "2023-06-18T09:15:00",
    status: "pending",
    total: 76.96,
    items: [
      { id: "2", name: "Organic Cotton T-Shirt", quantity: 2, price: 29.99 },
      { id: "8", name: "Hemp Tote Bag", quantity: 1, price: 34.99 }
    ],
    shippingAddress: {
      street: "789 Eco Lane",
      city: "Sustainaville",
      state: "Washington",
      zipCode: "98001",
      country: "United States"
    }
  },
  {
    id: "ord-004",
    customerId: "u4",
    customerName: "David Wilson",
    customerEmail: "david.w@example.com",
    date: "2023-06-20T16:20:00",
    status: "cancelled",
    total: 24.99,
    items: [
      { id: "4", name: "Stainless Steel Water Bottle", quantity: 1, price: 24.99 }
    ],
    shippingAddress: {
      street: "101 Earth Blvd",
      city: "Nature City",
      state: "Colorado",
      zipCode: "80001",
      country: "United States"
    }
  }
];

export const mockAnalyticsData = {
  salesOverTime: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [4200, 3800, 5100, 5700, 6200, 7500]
  },
  topProducts: [
    { id: "4", name: "Stainless Steel Water Bottle", sales: 120 },
    { id: "3", name: "Reusable Produce Bags - 5 Pack", sales: 95 },
    { id: "1", name: "Bamboo Toothbrush Set", sales: 85 },
    { id: "8", name: "Hemp Tote Bag", sales: 70 },
    { id: "2", name: "Organic Cotton T-Shirt", sales: 65 }
  ],
  categorySales: {
    labels: ['Home & Living', 'Personal Care', 'Clothing', 'Food & Drinks', 'Accessories', 'Office Supplies'],
    data: [35, 25, 15, 12, 8, 5]
  }
};
