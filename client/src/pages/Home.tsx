import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CategorySection } from '@/components/CategorySection';
import { ProductSection } from '@/components/ProductSection';
import { ReviewSection } from '@/components/ReviewSection';
import { TrustBadges } from '@/components/TrustBadges';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { Product } from '@/components/ProductCard';
import { useCart } from '@/lib/cart-context';
import { addToCart, getProducts, getCategories, getCart, type ApiProduct } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

import heroImage from '@assets/generated_images/corporate_gifting_hero_banner.png';

const heroSlides = [
  {
    id: '1',
    image: heroImage,
    title: 'Premium Corporate Gifts',
    subtitle: 'Customized merchandise with your company logo. Make a lasting impression.',
    ctaText: 'Shop Now',
    ctaHref: '#products',
  },
  {
    id: '2',
    image: heroImage,
    title: 'Bulk Orders Welcome',
    subtitle: 'Special discounts for orders above 100 units. Contact us for custom quotes.',
    ctaText: 'Get Quote',
    ctaHref: '#contact',
  },
];

function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    image: apiProduct.image,
    hoverImage: apiProduct.hoverImage || undefined,
    originalPrice: apiProduct.originalPrice,
    salePrice: apiProduct.salePrice,
    rating: apiProduct.rating,
    votes: apiProduct.votes,
    colors: apiProduct.colors || undefined,
    badge: apiProduct.badge || undefined,
    category: apiProduct.categoryId || 'General',
  };
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { addItem, setIsOpen } = useCart();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, color }: { productId: string; color?: string }) =>
      addToCart(productId, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      setIsOpen(true);
      toast.success('Added to cart', {
        description: 'Product has been added to your cart.',
      });
    },
    onError: () => {
      toast.error('Error', {
        description: 'Failed to add product to cart.',
      });
    },
  });

  const handleAddToCart = (product: Product, color?: string) => {
    addToCartMutation.mutate({ productId: product.id, color });
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      originalPrice: product.originalPrice,
      image: product.image,
      color,
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: { name: string }) => {
    console.log('Category clicked:', category.name);
  };

  const mappedProducts = products.map(mapApiProductToProduct);
  const mappedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    image: cat.image || '',
    productCount: cat.productCount || 0,
  }));

  const corporateProducts = mappedProducts.slice(0, 4);
  const trendingProducts = mappedProducts.slice(4, 8);

  const reviews = [
    {
      id: '1',
      customerName: 'Sushil Kumar',
      rating: 5,
      comment: 'Excellent quality! The printing was crisp and the fabric is very comfortable. Perfect for our company events.',
      productName: 'Customized Polo T-Shirt',
      productImage: products[0]?.image || '',
      date: 'Nov 28, 2025',
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      rating: 5,
      comment: "Great badges! The magnetic clasp is strong and doesn't damage clothes. Quick delivery too.",
      productName: 'Magnetic Badge',
      productImage: products[1]?.image || '',
      date: 'Nov 26, 2025',
    },
    {
      id: '3',
      customerName: 'Rahul Mehta',
      rating: 5,
      comment: 'Beautiful keychains with excellent engraving. Our employees loved them as gifts!',
      productName: 'Metal Keychain',
      productImage: products[2]?.image || '',
      date: 'Nov 25, 2025',
    },
    {
      id: '4',
      customerName: 'Anita Desai',
      rating: 4,
      comment: 'Good quality products. The customization was exactly as we wanted.',
      productName: 'Customized Polo T-Shirt',
      productImage: products[0]?.image || '',
      date: 'Nov 24, 2025',
    },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Header />
      <CartDrawer />

      <main>
        <HeroBanner slides={heroSlides} />

        <TrustBadges />

        {categoriesLoading ? (
          <div className="py-12">
            <div className="mx-auto max-w-7xl px-4">
              <Skeleton className="mx-auto mb-8 h-8 w-48" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-md" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <CategorySection categories={mappedCategories} onCategoryClick={handleCategoryClick} />
        )}

        {productsLoading ? (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4">
              <Skeleton className="mb-8 h-8 w-48" />
              <ProductSkeleton />
            </div>
          </section>
        ) : (
          <>
            <ProductSection
              title="Corporate Gifting"
              subtitle="Hot Selling Products"
              products={corporateProducts}
              onViewAll={() => console.log('View all corporate gifts')}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />

            {trendingProducts.length > 0 && (
              <ProductSection
                title="Order Now"
                subtitle="Trending Products"
                products={trendingProducts}
                onViewAll={() => console.log('View all trending')}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            )}
          </>
        )}

        {products.length > 0 && <ReviewSection reviews={reviews} />}

        <NewsletterSection />
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={(product, color, quantity) => {
          for (let i = 0; i < (quantity || 1); i++) {
            handleAddToCart(product, color);
          }
        }}
      />
    </div>
  );
}
