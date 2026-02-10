// Three-level categories: level1 -> level2 -> level3 (children optional at each level)
export const categories = [
  {
    id: "elec",
    label: "Electronics",
    children: [
      {
        id: "elec-phone",
        label: "Phones",
        children: [
          { id: "elec-phone-smart", label: "Smartphones" },
          { id: "elec-phone-accessories", label: "Accessories" },
        ],
      },
      {
        id: "elec-laptop",
        label: "Laptops",
        children: [
          { id: "elec-laptop-ultra", label: "Ultrabooks" },
          { id: "elec-laptop-gaming", label: "Gaming" },
        ],
      },
      { id: "elec-tablet", label: "Tablets", children: [] },
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    children: [
      {
        id: "fashion-men",
        label: "Men",
        children: [
          { id: "fashion-men-shirts", label: "Shirts" },
          { id: "fashion-men-pants", label: "Pants" },
        ],
      },
      {
        id: "fashion-women",
        label: "Women",
        children: [
          { id: "fashion-women-dresses", label: "Dresses" },
          { id: "fashion-women-shoes", label: "Shoes" },
        ],
      },
      { id: "fashion-kids", label: "Kids", children: [] },
    ],
  },
  {
    id: "home",
    label: "Home & Garden",
    children: [
      {
        id: "home-furniture",
        label: "Furniture",
        children: [
          { id: "home-furniture-living", label: "Living Room" },
          { id: "home-furniture-bedroom", label: "Bedroom" },
        ],
      },
      { id: "home-decor", label: "Decor", children: [] },
      { id: "home-kitchen", label: "Kitchen", children: [] },
    ],
  },
  {
    id: "sports",
    label: "Sports",
    children: [
      {
        id: "sports-outdoor",
        label: "Outdoor",
        children: [
          { id: "sports-outdoor-camping", label: "Camping" },
          { id: "sports-outdoor-hiking", label: "Hiking" },
        ],
      },
      { id: "sports-fitness", label: "Fitness", children: [] },
    ],
  },
];

export const adsSlides = [
  { id: 1, title: "Summer Sale", subtitle: "Up to 50% off" },
  { id: 2, title: "New Arrivals", subtitle: "Check out the latest" },
  { id: 3, title: "Free Shipping", subtitle: "On orders over $50" },
];

export const importantNotices = [
  { id: 1, text: "Free returns within 30 days" },
  { id: 2, text: "Flash deal: 2 for 1 on selected items" },
  { id: 3, text: "New collection dropping this week" },
];

// Products with enough fields for listing and detail
export const allProducts = [
  {
    id: "p1",
    title: "Wireless Headphones Pro",
    sku: "SKU-ELEC-001",
    price: 129.99,
    originalPrice: 159.99,
    discountRate: 19,
    images: ["/static/placeholder-product.png", "/static/placeholder-product.png"],
    categoryId: "elec",
  },
  {
    id: "p2",
    title: "Ultra HD Monitor 27\"",
    sku: "SKU-ELEC-002",
    price: 299.99,
    originalPrice: 349.99,
    discountRate: 14,
    images: ["/static/placeholder-product.png"],
    categoryId: "elec",
  },
  {
    id: "p3",
    title: "Classic Denim Jacket",
    sku: "SKU-FASH-001",
    price: 79.99,
    originalPrice: 99.99,
    discountRate: 20,
    images: ["/static/placeholder-product.png"],
    categoryId: "fashion",
  },
  {
    id: "p4",
    title: "Running Shoes Air",
    sku: "SKU-SPORTS-001",
    price: 119.99,
    originalPrice: 119.99,
    discountRate: 0,
    images: ["/static/placeholder-product.png"],
    categoryId: "sports",
  },
  {
    id: "p5",
    title: "Smart Watch Series X",
    sku: "SKU-ELEC-003",
    price: 249.99,
    originalPrice: 299.99,
    discountRate: 17,
    images: ["/static/placeholder-product.png"],
    categoryId: "elec",
  },
  {
    id: "p6",
    title: "Desk Lamp LED",
    sku: "SKU-HOME-001",
    price: 39.99,
    originalPrice: 49.99,
    discountRate: 20,
    images: ["/static/placeholder-product.png"],
    categoryId: "home",
  },
  {
    id: "p7",
    title: "Backpack Explorer",
    sku: "SKU-FASH-002",
    price: 59.99,
    originalPrice: 69.99,
    discountRate: 14,
    images: ["/static/placeholder-product.png"],
    categoryId: "fashion",
  },
  {
    id: "p8",
    title: "Yoga Mat Premium",
    sku: "SKU-SPORTS-002",
    price: 34.99,
    originalPrice: 44.99,
    discountRate: 22,
    images: ["/static/placeholder-product.png"],
    categoryId: "sports",
  },
];

// Section definitions: which products and initial count
export const recommendedProductIds = ["p1", "p5", "p2", "p3", "p6"];
export const mostVisitedProductIds = ["p4", "p7", "p8", "p1", "p2", "p3"];
export const trendingProductIds = ["p3", "p1", "p4", "p6", "p5", "p7", "p8"];

export function getProductById(id) {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByIds(ids) {
  return ids.map((id) => getProductById(id)).filter(Boolean);
}
