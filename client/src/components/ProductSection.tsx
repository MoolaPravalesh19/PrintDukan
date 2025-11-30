import { Button } from '@/components/ui/button';
import { ProductCard, Product } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onViewAll?: () => void;
  onAddToCart?: (product: Product, color?: string) => void;
  onProductClick?: (product: Product) => void;
}

export function ProductSection({
  title,
  subtitle,
  products,
  onViewAll,
  onAddToCart,
  onProductClick,
}: ProductSectionProps) {
  return (
    <section className="py-12" data-testid={`section-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {onViewAll && (
            <Button variant="ghost" className="gap-2" onClick={onViewAll} data-testid="button-view-all">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
