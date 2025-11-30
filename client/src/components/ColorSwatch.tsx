import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const colorMap: Record<string, string> = {
  Black: '#1a1a1a',
  Navy: '#000080',
  Red: '#dc2626',
  Gray: '#6b7280',
  White: '#ffffff',
  Maroon: '#800000',
  RoyalBlue: '#4169e1',
  Orange: '#f97316',
  Purple: '#7c3aed',
  Pink: '#ec4899',
  Yellow: '#eab308',
  SkyBlue: '#38bdf8',
  DarkGreen: '#166534',
  LimeGreen: '#84cc16',
  Silver: '#c0c0c0',
  Gold: '#ffd700',
};

interface ColorSwatchProps {
  colors: string[];
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatch({
  colors,
  selectedColor,
  onSelectColor,
  maxVisible = 8,
  size = 'sm',
}: ColorSwatchProps) {
  const visibleColors = colors.slice(0, maxVisible);
  const remainingCount = colors.length - maxVisible;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex flex-wrap items-center gap-1" data-testid="color-swatch">
      {visibleColors.map((color) => (
        <button
          key={color}
          onClick={() => onSelectColor?.(color)}
          className={cn(
            'rounded-full border transition-transform hover:scale-110',
            sizeClasses[size],
            selectedColor === color
              ? 'ring-2 ring-primary ring-offset-1'
              : 'border-border',
            color === 'White' && 'border-muted-foreground/30'
          )}
          style={{ backgroundColor: colorMap[color] || color }}
          title={color}
          data-testid={`color-${color.toLowerCase()}`}
        >
          {selectedColor === color && (
            <Check
              className={cn(
                'h-full w-full p-0.5',
                ['White', 'Yellow', 'LimeGreen', 'Silver', 'Gold'].includes(color)
                  ? 'text-foreground'
                  : 'text-white'
              )}
            />
          )}
        </button>
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-muted-foreground">+{remainingCount} more</span>
      )}
    </div>
  );
}
