import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  ChevronDown,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';
import { type ApiCartItem } from '@/lib/api';
import darkLogo from '@assets/generated_images/WHITE BG.png';
import lightLogo from '@assets/generated_images/WHITE BG.png';

const categories = [
  { name: 'T-Shirts', href: '#t-shirts' },
  { name: 'Badges', href: '#badges' },
  { name: 'Keychains', href: '#keychains' },
  { name: 'Pens', href: '#pens' },
  { name: 'Gifts', href: '#gifts' },
];

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { setIsOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { getCart } = await import('@/lib/api');
      return getCart();
    },
  });

  const totalItems = (cartItems as ApiCartItem[]).reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    setIsOpen(true);
    onCartClick?.();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-4 py-4">
                <h2 className="text-lg font-semibold">Categories</h2>
                {categories.map((cat) => (
                  <a
                    key={cat.name}
                    href={cat.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${cat.name.toLowerCase()}`}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <a href="/" className="flex items-center gap-2" data-testid="link-home">
            <img
              src={theme === 'dark' ? darkLogo : lightLogo}
              alt="PrintDukan Logo"
              className="h-16 w-auto object-contain"
              data-testid="logo-image"
            />
          </a>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((cat) => (
            <DropdownMenu key={cat.name}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1" data-testid={`nav-${cat.name.toLowerCase()}`}>
                  {cat.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View All {cat.name}</DropdownMenuItem>
                <DropdownMenuItem>Best Sellers</DropdownMenuItem>
                <DropdownMenuItem>New Arrivals</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center transition-all duration-300',
              searchOpen ? 'w-64' : 'w-auto'
            )}
          >
            {searchOpen ? (
              <div className="relative flex w-full items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                  autoFocus
                  data-testid="input-search"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  data-testid="button-close-search"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon" data-testid="button-account">
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleCartClick}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                data-testid="cart-count"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
