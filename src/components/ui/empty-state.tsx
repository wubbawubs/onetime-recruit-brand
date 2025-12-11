import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

// SVG Root illustration component
const RootIllustration = () => (
  <svg
    viewBox="0 0 200 160"
    className="w-32 h-32 text-primary/20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main stem */}
    <path
      d="M100 40 L100 80"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "0ms" }}
    />
    {/* Leaves */}
    <ellipse
      cx="85"
      cy="35"
      rx="12"
      ry="18"
      fill="currentColor"
      className="animate-scale-in"
      style={{ animationDelay: "200ms", transformOrigin: "85px 50px" }}
      transform="rotate(-30 85 35)"
    />
    <ellipse
      cx="115"
      cy="35"
      rx="12"
      ry="18"
      fill="currentColor"
      className="animate-scale-in"
      style={{ animationDelay: "300ms", transformOrigin: "115px 50px" }}
      transform="rotate(30 115 35)"
    />
    <ellipse
      cx="100"
      cy="25"
      rx="10"
      ry="16"
      fill="currentColor"
      className="animate-scale-in"
      style={{ animationDelay: "400ms", transformOrigin: "100px 40px" }}
    />
    {/* Roots */}
    <path
      d="M100 80 Q90 100 80 130"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "100ms" }}
    />
    <path
      d="M100 80 Q100 105 100 140"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "150ms" }}
    />
    <path
      d="M100 80 Q110 100 120 130"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "200ms" }}
    />
    {/* Smaller root branches */}
    <path
      d="M85 110 Q75 120 65 125"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "250ms" }}
    />
    <path
      d="M115 110 Q125 120 135 125"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "300ms" }}
    />
    <path
      d="M100 120 Q95 135 88 145"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "350ms" }}
    />
    <path
      d="M100 120 Q105 135 112 145"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "400ms" }}
    />
  </svg>
);

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in",
        className
      )}
    >
      <RootIllustration />
      <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6 btn-glow">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
