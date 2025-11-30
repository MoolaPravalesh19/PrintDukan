import { mockProducts, mockCategories, mockReviews, type MockProduct, type MockCategory, type MockReview } from './mock-data';

// Types
export interface ApiProduct extends MockProduct {}
export interface ApiCategory extends MockCategory {}
export interface ApiReview extends MockReview {}

export interface ApiCartItem {
  id: string;
  productId: string;
  quantity: number;
  color: string | null;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
}

// LocalStorage keys
const CART_KEY = 'printcraft_cart';
const ORDERS_KEY = 'printcraft_orders';

// Utility: Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Product APIs
export async function getProducts(): Promise<ApiProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 300);
  });
}

export async function getProductById(id: string): Promise<ApiProduct | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.find(p => p.id === id) || null);
    }, 300);
  });
}

// Category APIs
export async function getCategories(): Promise<ApiCategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 300);
  });
}

// Cart APIs (using localStorage)
export async function getCart(): Promise<ApiCartItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(CART_KEY);
      resolve(stored ? JSON.parse(stored) : []);
    }, 200);
  });
}

export async function addToCart(productId: string, color?: string, quantity: number = 1): Promise<ApiCartItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as ApiCartItem[];
      const existingItem = cart.find(item => item.productId === productId && item.color === (color || null));
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: generateId(),
          productId,
          quantity,
          color: color || null,
        });
      }
      
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      resolve(cart[cart.length - 1] || cart.find(item => item.productId === productId)!);
    }, 200);
  });
}

export async function updateCartQuantity(itemId: string, quantity: number): Promise<ApiCartItem | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as ApiCartItem[];
      const item = cart.find(i => i.id === itemId);
      
      if (item) {
        item.quantity = quantity;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        resolve(item);
      } else {
        resolve(null);
      }
    }, 200);
  });
}

export async function removeFromCart(itemId: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as ApiCartItem[];
      const filtered = cart.filter(i => i.id !== itemId);
      localStorage.setItem(CART_KEY, JSON.stringify(filtered));
      resolve();
    }, 200);
  });
}

export async function clearCart(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(CART_KEY);
      resolve();
    }, 200);
  });
}

// Order APIs
export async function createOrder(data: CreateOrderData): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as ApiCartItem[];
      
      if (cart.length === 0) {
        throw new Error('Cart is empty');
      }

      const order = {
        id: generateId(),
        ...data,
        items: cart,
        totalAmount: cart.reduce((sum, item) => {
          const product = mockProducts.find(p => p.id === item.productId);
          return sum + (product?.salePrice || 0) * item.quantity;
        }, 0),
        createdAt: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      orders.push(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      localStorage.removeItem(CART_KEY);

      resolve(order);
    }, 300);
  });
}

export async function getOrders(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(ORDERS_KEY);
      resolve(stored ? JSON.parse(stored) : []);
    }, 200);
  });
}

// Review APIs
export async function getReviewsByProductId(productId: string): Promise<ApiReview[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReviews.filter(r => r.productId === productId));
    }, 200);
  });
}

export async function createReview(data: any): Promise<ApiReview> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const review: ApiReview = {
        id: generateId(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      resolve(review);
    }, 200);
  });
}

// Export for use with React Query
export const api = {
  products: {
    list: getProducts,
    getById: getProductById,
  },
  categories: {
    list: getCategories,
  },
  cart: {
    get: getCart,
    add: addToCart,
    updateQuantity: updateCartQuantity,
    remove: removeFromCart,
    clear: clearCart,
  },
  orders: {
    create: createOrder,
    list: getOrders,
  },
  reviews: {
    getByProductId: getReviewsByProductId,
    create: createReview,
  },
};
