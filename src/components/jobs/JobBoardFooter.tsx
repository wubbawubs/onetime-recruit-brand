import { Sprout } from 'lucide-react';

interface JobBoardFooterProps {
  hideFooterBadge?: boolean;
}

export function JobBoardFooter({ hideFooterBadge = false }: JobBoardFooterProps) {
  if (hideFooterBadge) {
    return (
      <footer className="mt-16 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Alle rechten voorbehouden
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 py-8 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <a 
            href="https://onerooted.nl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-primary/10">
              <Sprout className="h-3 w-3 text-primary" />
            </span>
            <span>Powered by <strong className="font-medium">One Rooted</strong></span>
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacybeleid
          </a>
        </div>
      </div>
    </footer>
  );
}
