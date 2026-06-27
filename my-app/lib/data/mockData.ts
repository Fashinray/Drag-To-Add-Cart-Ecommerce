import type { Product, Order, ActivityItem, SalesDataPoint } from "@/lib/types";

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Pro Mechanical Keyboard",
    sku: "KB-MX-001",
    price: 189.99,
    compareAtPrice: 229.99,
    description:
      "A sleek, modern mechanical keyboard with matte black keys and subtle RGB underglow. Built for professionals who demand precision and durability in every keystroke.",
    category: "Peripherals",
    tags: ["keyboard", "mechanical", "rgb", "productivity"],
    images: [
      {
        id: "img-kb-001",
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
        alt: "Pro Mechanical Keyboard front view",
      },
      {
        id: "img-kb-002",
        url: "https://images.unsplash.com/photo-1601445638532-3fd9e73e3517?w=800&q=80",
        alt: "Pro Mechanical Keyboard side view",
      },
    ],
    variants: {
      colors: [
        { id: "c1", label: "Matte Black", value: "#1a1a1a", inStock: true },
        { id: "c2", label: "Space Gray", value: "#6b7280", inStock: true },
        { id: "c3", label: "Arctic White", value: "#f8fafc", inStock: false },
      ],
    },
    stock: 42,
    rating: 4.8,
    reviewCount: 214,
    featured: true,
  },
  {
    id: "prod-002",
    name: "Wireless Pro Headphones",
    sku: "HP-WL-002",
    price: 349.99,
    compareAtPrice: 399.99,
    description:
      "High-end minimalist professional wireless headphones with 40-hour battery life, active noise cancellation, and studio-grade audio fidelity.",
    category: "Audio",
    tags: ["headphones", "wireless", "anc", "premium"],
    images: [
      {
        id: "img-hp-001",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        alt: "Wireless Pro Headphones",
      },
      {
        id: "img-hp-002",
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        alt: "Wireless Pro Headphones side",
      },
    ],
    variants: {
      colors: [
        { id: "c1", label: "Midnight Black", value: "#0f172a", inStock: true },
        { id: "c2", label: "Warm Silver", value: "#cbd5e1", inStock: true },
      ],
    },
    stock: 18,
    rating: 4.9,
    reviewCount: 389,
    featured: true,
  },
  {
    id: "prod-003",
    name: "Premium Leather Laptop Sleeve",
    sku: "LS-LT-003",
    price: 89.99,
    description:
      "Premium tan leather laptop sleeve with minimal stitching and a professional finish. Fits laptops up to 15 inches.",
    category: "Accessories",
    tags: ["laptop", "leather", "sleeve", "carry"],
    images: [
      {
        id: "img-ls-001",
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        alt: "Premium Leather Laptop Sleeve",
      },
    ],
    variants: {
      sizes: [
        { id: "s1", label: '13"', value: "13", inStock: true },
        { id: "s2", label: '15"', value: "15", inStock: true },
        { id: "s3", label: '16"', value: "16", inStock: false },
      ],
    },
    stock: 67,
    rating: 4.7,
    reviewCount: 128,
    featured: false,
  },
  {
    id: "prod-004",
    name: "Minimalist Ergo Chair",
    sku: "CH-ER-004",
    price: 799.99,
    compareAtPrice: 949.99,
    description:
      "A high-end minimalist ergonomic office chair with mesh backrest and polished chrome frame. Engineered for all-day comfort.",
    category: "Furniture",
    tags: ["chair", "ergonomic", "office", "premium"],
    images: [
      {
        id: "img-ch-001",
        url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
        alt: "Minimalist Ergo Chair",
      },
    ],
    variants: {
      colors: [
        { id: "c1", label: "Grey Mesh", value: "#9ca3af", inStock: true },
        { id: "c2", label: "Black Mesh", value: "#1f2937", inStock: true },
      ],
    },
    stock: 9,
    rating: 4.6,
    reviewCount: 76,
    featured: true,
  },
  {
    id: "prod-005",
    name: "UltraWide 34\" Monitor",
    sku: "MN-UW-005",
    price: 1099.99,
    compareAtPrice: 1299.99,
    description:
      "Ultra-wide 34-inch curved monitor with a crisp QHD display, 144Hz refresh rate, and USB-C connectivity. The centerpiece of any professional setup.",
    category: "Displays",
    tags: ["monitor", "ultrawide", "curved", "4k"],
    images: [
      {
        id: "img-mn-001",
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
        alt: "UltraWide 34 Monitor",
      },
    ],
    variants: {},
    stock: 14,
    rating: 4.8,
    reviewCount: 201,
    featured: true,
  },
  {
    id: "prod-006",
    name: "Premium Leather Desk Pad",
    sku: "DP-LT-006",
    price: 59.99,
    description:
      "Deep-navy leather desk pad with clean stitching and a minimalist logo. Protects your desk and elevates your workspace aesthetic.",
    category: "Accessories",
    tags: ["deskpad", "leather", "accessories", "workspace"],
    images: [
      {
        id: "img-dp-001",
        url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
        alt: "Premium Leather Desk Pad",
      },
    ],
    variants: {
      colors: [
        { id: "c1", label: "Deep Navy", value: "#1e3a5f", inStock: true },
        { id: "c2", label: "Cognac Brown", value: "#92400e", inStock: true },
        { id: "c3", label: "Forest Green", value: "#14532d", inStock: true },
      ],
    },
    stock: 93,
    rating: 4.5,
    reviewCount: 312,
    featured: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customerId: "cust-001",
    customerName: "Alex Morgan",
    customerEmail: "alex.morgan@workspace.com",
    items: [
      {
        id: "ci-001",
        productId: "prod-001",
        name: "Pro Mechanical Keyboard",
        price: 189.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
        variant: "Matte Black",
        sku: "KB-MX-001",
      },
    ],
    total: 189.99,
    status: "delivered",
    createdAt: "2024-06-01T10:30:00Z",
    shippingInfo: {
      firstName: "Alex",
      lastName: "Morgan",
      email: "alex.morgan@workspace.com",
      address: "123 Productivity Way",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "US",
    },
  },
];

export const mockActivityItems: ActivityItem[] = [
  { id: "act-001", type: "order",     message: "New order #ORD-2024-089 from Sarah K.", time: "2 min ago" },
  { id: "act-002", type: "inventory", message: "Wireless Pro Headphones stock low (3 left)", time: "15 min ago" },
  { id: "act-003", type: "payment",   message: "Payment received for #ORD-2024-088", time: "1 hr ago" },
  { id: "act-004", type: "order",     message: "New order #ORD-2024-087 from James T.", time: "2 hr ago" },
  { id: "act-005", type: "inventory", message: "Minimalist Ergo Chair restocked (25 units)", time: "3 hr ago" },
];

export const mockSalesData: SalesDataPoint[] = [
  { day: "Mon", current: 4200,  previous: 3800 },
  { day: "Tue", current: 5800,  previous: 4200 },
  { day: "Wed", current: 4900,  previous: 5100 },
  { day: "Thu", current: 7200,  previous: 5600 },
  { day: "Fri", current: 8100,  previous: 6300 },
  { day: "Sat", current: 6400,  previous: 5900 },
  { day: "Sun", current: 3900,  previous: 4100 },
];