import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  name: string;
  image: string;
  productCount: number;
  onClick?: () => void;
}

export function CategoryCard({ name, image, productCount, onClick }: CategoryCardProps) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden border-card-border hover-elevate"
      onClick={onClick}
      data-testid={`category-card-${name.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
          <h3 className="font-semibold" data-testid={`category-name-${name.toLowerCase().replace(/\s/g, '-')}`}>
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">{productCount} Products</p>
        </div>
      </div>
    </Card>
  );
}
