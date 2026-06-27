// PRODUCT

export type ProductVariant = {
  id: string;
  label: string;
  value: string;
  inStock: boolean;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  category: string;
  tags: string[];
  images: ProductImage[];
  variants: {
    colors?: ProductVariant[];
    sizes?: ProductVariant[];
  };
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
};


// CART

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  sku: string;
};

export type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};


// CHECKOUT

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type PaymentInfo = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
};

export type CheckoutStep = "shipping" | "payment" | "review";


// ORDER

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingInfo: ShippingInfo;
};


// ADMIN

export type MetricCard = {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
};

export type ActivityItem = {
  id: string;
  type: "order" | "inventory" | "payment" | "review";
  message: string;
  time: string;
};

export type SalesDataPoint = {
  day: string;
  current: number;
  previous: number;
};


// UI

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant = "default" | "primary" | "success" | "warning" | "error";