import poloImage from '@assets/generated_images/navy_polo_t-shirt_product.png';
import badgeImage from '@assets/generated_images/magnetic_badge_product.png';
import keychainImage from '@assets/generated_images/metal_keychain_product.png';
import penImage from '@assets/generated_images/premium_metal_pen_product.png';
import standImage from '@assets/generated_images/mobile_stand_product.png';
import calendarImage from '@assets/generated_images/infinity_calendar_product.png';
import giftSetImage from '@assets/generated_images/corporate_gift_set.png';

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string;
  hoverImage: string | null;
  originalPrice: number;
  salePrice: number;
  rating: number;
  votes: number;
  colors: string[] | null;
  badge: string | null;
  categoryId: string | null;
  inStock: boolean;
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  productCount: number;
}

export interface MockReview {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export const mockCategories: MockCategory[] = [
  {
    id: '1',
    name: 'Polo T-Shirts',
    slug: 'polo-tshirts',
    image: poloImage,
    productCount: 3,
  },
  {
    id: '2',
    name: 'Badges',
    slug: 'badges',
    image: badgeImage,
    productCount: 2,
  },
  {
    id: '3',
    name: 'Keychains',
    slug: 'keychains',
    image: keychainImage,
    productCount: 2,
  },
  {
    id: '4',
    name: 'Pens',
    slug: 'pens',
    image: penImage,
    productCount: 1,
  },
  {
    id: '5',
    name: 'Mobile Stands',
    slug: 'mobile-stands',
    image: standImage,
    productCount: 1,
  },
  {
    id: '6',
    name: 'Gift Sets',
    slug: 'gift-sets',
    image: giftSetImage,
    productCount: 2,
  },
];

export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'Customized Polo T-Shirt With Your Company Logo',
    slug: 'customized-polo-tshirt',
    description: 'Premium quality polo t-shirt with custom logo printing. Perfect for corporate events and team uniforms.',
    image: poloImage,
    hoverImage: null,
    originalPrice: 3850,
    salePrice: 700,
    rating: 4.3,
    votes: 644,
    colors: ['Black', 'Navy', 'Red', 'Gray', 'White', 'Maroon', 'RoyalBlue', 'Orange'],
    badge: 'Hot Selling',
    categoryId: '1',
    inStock: true,
  },
  {
    id: '2',
    name: 'Customized Magnetic Badge | Wear Your Brand',
    slug: 'magnetic-badge',
    description: 'High-quality magnetic name badge with custom printing. Strong magnet that won\'t damage clothes.',
    image: badgeImage,
    hoverImage: null,
    originalPrice: 999,
    salePrice: 699,
    rating: 4.4,
    votes: 1412,
    colors: null,
    badge: 'Hot Selling',
    categoryId: '2',
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Metal Keychain | Best for Corporate Gifting',
    slug: 'metal-keychain',
    description: 'Elegant metal keychain with laser engraving. Perfect corporate gift for clients and employees.',
    image: keychainImage,
    hoverImage: null,
    originalPrice: 810,
    salePrice: 699,
    rating: 4.2,
    votes: 466,
    colors: ['Silver', 'Gold'],
    badge: null,
    categoryId: '3',
    inStock: true,
  },
  {
    id: '4',
    name: 'Premium Metal Pen | Best Corporate Gift',
    slug: 'metal-pen',
    description: 'Executive metal ballpoint pen with premium finish. Ideal for corporate gifting.',
    image: penImage,
    hoverImage: null,
    originalPrice: 1975,
    salePrice: 1199,
    rating: 4.2,
    votes: 101,
    colors: ['Silver', 'Gold', 'Black'],
    badge: null,
    categoryId: '4',
    inStock: true,
  },
  {
    id: '5',
    name: 'Premium Mobile Stand | Best for Corporate Gifting',
    slug: 'mobile-stand',
    description: 'Elegant wooden mobile phone stand. Great desk accessory for professionals.',
    image: standImage,
    hoverImage: null,
    originalPrice: 1199,
    salePrice: 999,
    rating: 4.2,
    votes: 70,
    colors: null,
    badge: 'Hot Selling',
    categoryId: '5',
    inStock: true,
  },
  {
    id: '6',
    name: 'Infinity Calendar | Best for Corporate Gifting',
    slug: 'infinity-calendar',
    description: 'Unique perpetual calendar that works forever. Beautiful desk accessory.',
    image: calendarImage,
    hoverImage: null,
    originalPrice: 5990,
    salePrice: 5390,
    rating: 4.3,
    votes: 138,
    colors: null,
    badge: null,
    categoryId: '6',
    inStock: true,
  },
  {
    id: '7',
    name: 'Premium 2-in-1 Gift Set | Best Corporate Gift',
    slug: 'gift-set-2in1',
    description: 'Elegant gift set containing premium pen and keychain. Comes in beautiful packaging.',
    image: giftSetImage,
    hoverImage: null,
    originalPrice: 3299,
    salePrice: 2650,
    rating: 4.3,
    votes: 16,
    colors: null,
    badge: null,
    categoryId: '6',
    inStock: true,
  },
  {
    id: '8',
    name: 'Customized Premium Belt Keychains | Brand Promotion',
    slug: 'belt-keychain',
    description: 'Premium leather belt keychain with metal accents. Excellent for brand promotion.',
    image: keychainImage,
    hoverImage: null,
    originalPrice: 5680,
    salePrice: 4939,
    rating: 4.1,
    votes: 21,
    colors: ['Black', 'Brown'],
    badge: null,
    categoryId: '3',
    inStock: true,
  },
  {
    id: '9',
    name: 'Customized Cotton T-Shirt With Your Company Logo',
    slug: 'cotton-tshirt',
    description: 'Comfortable cotton t-shirt with custom printing. Perfect for casual corporate wear.',
    image: poloImage,
    hoverImage: null,
    originalPrice: 3850,
    salePrice: 700,
    rating: 4.1,
    votes: 320,
    colors: ['Black', 'Navy', 'Red', 'Gray', 'White'],
    badge: null,
    categoryId: '1',
    inStock: true,
  },
  {
    id: '10',
    name: 'Customized Polo T-Shirt With Logo Cutout Badge',
    slug: 'polo-tshirt-badge',
    description: 'Premium polo with unique logo cutout badge design. Stand out from the crowd.',
    image: poloImage,
    hoverImage: null,
    originalPrice: 4730,
    salePrice: 4050,
    rating: 4.2,
    votes: 36,
    colors: ['Black', 'Navy', 'Red', 'Gray', 'White', 'Maroon'],
    badge: null,
    categoryId: '1',
    inStock: true,
  },
];

export const mockReviews: MockReview[] = [
  {
    id: '1',
    productId: '1',
    customerName: 'Sushil Kumar',
    rating: 5,
    comment: 'Excellent quality! The printing was crisp and the fabric is very comfortable. Perfect for our company events.',
    createdAt: 'Nov 28, 2025',
  },
  {
    id: '2',
    productId: '2',
    customerName: 'Priya Sharma',
    rating: 5,
    comment: 'Great badges! The magnetic clasp is strong and doesn\'t damage clothes. Quick delivery too.',
    createdAt: 'Nov 26, 2025',
  },
  {
    id: '3',
    productId: '3',
    customerName: 'Rahul Mehta',
    rating: 5,
    comment: 'Beautiful keychains with excellent engraving. Our employees loved them as gifts!',
    createdAt: 'Nov 25, 2025',
  },
  {
    id: '4',
    productId: '1',
    customerName: 'Anita Desai',
    rating: 4,
    comment: 'Good quality products. The customization was exactly as we wanted.',
    createdAt: 'Nov 24, 2025',
  },
];
