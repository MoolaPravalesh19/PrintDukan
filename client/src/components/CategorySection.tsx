import { CategoryCard } from './CategoryCard';

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

interface CategorySectionProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
}

export function CategorySection({ categories, onCategoryClick }: CategorySectionProps) {
  return (
    <section className="py-12 bg-muted/30" data-testid="category-section">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              productCount={category.productCount}
              onClick={() => onCategoryClick?.(category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
