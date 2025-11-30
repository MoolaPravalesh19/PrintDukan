import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/lib/cart-context';
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { getCart, updateCartQuantity, removeFromCart, getProducts } from '@/lib/api';
import { type ApiProduct } from '@/lib/api';

interface CartItemWithProduct {
  id: string;
  productId: string;
  quantity: number;
  color: string | null;
  product: ApiProduct;
}

export function CartDrawer() {
  const { isOpen, setIsOpen } = useCart();
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const prods = await getProducts();
      return prods;
    },
  });

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const items = await getCart();
      const cartWithProducts = items.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)!,
      })).filter(item => item.product);
      return cartWithProducts as CartItemWithProduct[];
    },
    enabled: isOpen,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id: string) => removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed', {
        description: 'Product has been removed from your cart.',
      });
    },
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.salePrice || 0) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md" data-testid="cart-drawer">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <div>
              <h3 className="font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add some products to get started
              </p>
            </div>
            <Button onClick={() => setIsOpen(false)} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product?.name || 'Product'}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="line-clamp-1 text-sm font-medium">
                          {item.product?.name || 'Product'}
                        </h4>
                        {(item.color) && (
                          <p className="text-xs text-muted-foreground">
                            {item.color}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-primary">
                          ₹{(item.product?.salePrice || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            disabled={updateQuantityMutation.isPending}
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantityMutation.mutate({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                  })
                                : removeItemMutation.mutate(item.id)
                            }
                            data-testid={`quantity-minus-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            disabled={updateQuantityMutation.isPending}
                            onClick={() =>
                              updateQuantityMutation.mutate({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            }
                            data-testid={`quantity-plus-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          disabled={removeItemMutation.isPending}
                          onClick={() => removeItemMutation.mutate(item.id)}
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold" data-testid="cart-total">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button className="w-full" size="lg" data-testid="button-checkout">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  data-testid="button-continue-shopping-footer"
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
