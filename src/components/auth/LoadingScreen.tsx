import { useEffect, useState } from "react";
import onetimeLogo from "@/assets/onetime-logo.webp";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Easing function for smooth progress
      const t = currentStep / steps;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.min(eased * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 bg-background flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      {/* Logo container with refined animation */}
      <div className="relative mb-12">
        {/* Soft outer glow ring */}
        <div 
          className="absolute inset-0 -m-8 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            animation: 'pulse-glow 2.5s ease-in-out infinite',
          }}
        />
        
        {/* Rotating ring */}
        <div 
          className="absolute inset-0 -m-4"
          style={{
            animation: 'spin-slow 8s linear infinite',
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="hsl(var(--primary) / 0.1)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="1"
              strokeDasharray="20 280"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Logo with subtle float */}
        <div 
          className="relative"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <img 
            src={onetimeLogo} 
            alt="OneTimeRecruit" 
            className="h-20 w-20 object-contain drop-shadow-sm"
          />
        </div>
      </div>

      {/* Progress bar - minimal and elegant */}
      <div className="w-56 h-[3px] bg-muted/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 8px hsl(var(--primary) / 0.4)',
          }}
        />
      </div>

      {/* Loading text - refined typography */}
      <p className="mt-6 text-sm font-medium text-muted-foreground/70 tracking-wide">
        Laden...
      </p>

      {/* Custom keyframes */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.2;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}
