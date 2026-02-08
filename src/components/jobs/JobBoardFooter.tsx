import { Sprout } from 'lucide-react';

interface JobBoardFooterProps {
  hideFooterBadge?: boolean;
}

export function JobBoardFooter({ hideFooterBadge = false }: JobBoardFooterProps) {
  if (hideFooterBadge) {
    return (
      <footer className="mt-16 py-10 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Alle rechten voorbehouden
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 py-10 border-t border-border/50 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <a 
            href="https://onerooted.nl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-background border border-border/60 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
          >
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10">
              <Sprout className="h-3.5 w-3.5 text-primary" />
            </span>
            <span>Powered by <strong className="font-semibold text-foreground">One Rooted</strong></span>
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacybeleid
          </a>
        </div>
      </div>
    </footer>
  );
}
