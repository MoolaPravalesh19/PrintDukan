import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StarRating } from './StarRating';
import { ColorSwatch } from './ColorSwatch';
import { Product } from './ProductCard';
import { Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, color?: string, quantity?: number) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    onAddToCart?.(product, selectedColor, quantity);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden" data-testid="product-detail-modal">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-muted/30">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.badge && (
              <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="flex flex-col p-6">
            <DialogHeader className="text-left">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-xl font-bold leading-tight" data-testid="modal-product-name">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Product details and purchase options
                </DialogDescription>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" data-testid="button-wishlist">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid="button-share">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-4 space-y-6 flex-1">
              <StarRating rating={product.rating} votes={product.votes} size="md" />

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary" data-testid="modal-price">
                  ₹{product.salePrice.toLocaleString()}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <Badge variant="secondary" className="text-green-600">
                    Save {discount}%
                  </Badge>
                )}
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Color: <span className="text-muted-foreground">{selectedColor}</span>
                  </label>
                  <ColorSwatch
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                    size="lg"
                    maxVisible={12}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="modal-quantity-minus"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium" data-testid="modal-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="modal-quantity-plus"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div className="space-y-1">
                  <Truck className="mx-auto h-5 w-5 text-primary" />
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">On orders ₹5000+</p>
                </div>
                <div className="space-y-1">
                  <Shield className="mx-auto h-5 w-5 text-primary" />
                  <p className="font-medium">Quality Assured</p>
                  <p className="text-muted-foreground">Premium materials</p>
                </div>
                <div className="space-y-1">
                  <RotateCcw className="mx-auto h-5 w-5 text-primary" />
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-muted-foreground">7-day policy</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                className="flex-1 gap-2"
                size="lg"
                onClick={handleAddToCart}
                data-testid="modal-add-to-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" data-testid="modal-buy-now">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
