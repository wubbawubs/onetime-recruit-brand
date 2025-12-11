import { useEffect, useState } from "react";
import onetimeLogo from "@/assets/onetime-logo.webp";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* Animated logo container */}
      <div className="relative mb-8">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 -m-4 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "2s" }} />
        
        {/* Inner glowing ring */}
        <div className="absolute inset-0 -m-2 rounded-full bg-primary/20 animate-pulse" />
        
        {/* Logo with bounce animation */}
        <div className="relative animate-bounce" style={{ animationDuration: "2s" }}>
          <img 
            src={onetimeLogo} 
            alt="OneTimeRecruit" 
            className="h-16 w-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-sm text-muted-foreground animate-pulse">
        Laden...
      </p>
    </div>
  );
}
