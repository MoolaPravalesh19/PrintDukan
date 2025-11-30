import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from './StarRating';
import { ColorSwatch } from './ColorSwatch';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  name: string;
  image: string;
  hoverImage?: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  votes: number;
  colors?: string[];
  badge?: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, color?: string) => void;
  onClick?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <Card
      className="group relative overflow-visible border-card-border hover-elevate cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(product)}
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-md bg-muted/30">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <Badge
            className="absolute left-2 top-2 bg-accent text-accent-foreground"
            data-testid={`badge-${product.id}`}
          >
            {product.badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge
            variant="secondary"
            className="absolute right-2 top-2"
          >
            -{discount}%
          </Badge>
        )}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3 transition-opacity',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Button
            size="sm"
            className="w-full gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product, selectedColor);
            }}
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <StarRating rating={product.rating} votes={product.votes} />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span className="text-lg font-bold text-primary" data-testid={`price-${product.id}`}>
            ₹{product.salePrice.toLocaleString()}
          </span>
        </div>
        {product.colors && product.colors.length > 0 && (
          <div onClick={(e) => e.stopPropagation()}>
            <ColorSwatch
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              maxVisible={6}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
