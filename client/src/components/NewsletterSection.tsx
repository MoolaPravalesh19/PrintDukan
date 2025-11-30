import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // todo: remove mock functionality - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Subscribed!', {
      description: 'Thank you for subscribing to our newsletter.',
    });
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="bg-primary py-12 text-primary-foreground" data-testid="newsletter-section">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <Mail className="mx-auto mb-4 h-10 w-10" />
        <h2 className="mb-2 text-2xl font-bold md:text-3xl">Stay Updated</h2>
        <p className="mb-6 text-primary-foreground/80">
          Subscribe to our newsletter for exclusive offers and new product announcements
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary-foreground text-foreground"
            required
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isLoading}
            data-testid="button-subscribe"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  );
}
