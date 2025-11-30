import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

interface HeroBannerProps {
  slides: BannerSlide[];
  autoPlayInterval?: number;
}

export function HeroBanner({ slides, autoPlayInterval = 5000 }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden" data-testid="hero-banner">
      <div className="relative aspect-[21/9] md:aspect-[21/8]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                <div className="max-w-xl space-y-4">
                  <h1
                    className="text-3xl font-bold text-white md:text-5xl lg:text-6xl"
                    data-testid={`hero-title-${slide.id}`}
                  >
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/90 md:text-xl">
                    {slide.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
                    data-testid={`hero-cta-${slide.id}`}
                  >
                    {slide.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 text-white backdrop-blur-sm hover:bg-background/40"
        onClick={prevSlide}
        data-testid="hero-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 text-white backdrop-blur-sm hover:bg-background/40"
        onClick={nextSlide}
        data-testid="hero-next"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all',
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            )}
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
