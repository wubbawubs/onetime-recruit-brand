import { AlertCircle, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorBanner({
  title = "Er ging iets mis",
  message,
  onRetry,
  onDismiss,
  className,
}: ErrorBannerProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg",
        "bg-destructive/10 border border-destructive/20",
        "animate-in fade-in slide-in-from-top-2 duration-300",
        className
      )}
    >
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive/10 shrink-0">
        <AlertCircle className="h-4 w-4 text-destructive" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-destructive">{title}</p>
        <p className="text-sm text-destructive/80 mt-0.5">{message}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
            className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
          >
            <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", isRetrying && "animate-spin")} />
            {isRetrying ? "Bezig..." : "Opnieuw"}
          </Button>
        )}
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
