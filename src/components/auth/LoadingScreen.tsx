import { useEffect, useState, useMemo } from "react";
import onetimeLogo from "@/assets/onetime-logo.webp";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Generate floating particles
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    })), []
  );

  useEffect(() => {
    setMounted(true);
    const duration = 2200;
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
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
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
          animation: 'background-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `particle-float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Main logo container */}
      <div 
        className={`relative transition-all duration-1000 ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
        style={{ marginBottom: '4rem' }}
      >
        {/* Outermost pulsing glow */}
        <div 
          className="absolute inset-0 -m-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}
        />

        {/* Outer rotating ring */}
        <div 
          className="absolute inset-0 -m-12"
          style={{ animation: 'spin-slow 12s linear infinite' }}
        >
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="ring-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="hsl(var(--primary) / 0.08)"
              strokeWidth="1"
            />
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="url(#ring-gradient-1)"
              strokeWidth="2"
              strokeDasharray="40 80 20 80"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Middle counter-rotating ring */}
        <div 
          className="absolute inset-0 -m-8"
          style={{ animation: 'spin-reverse 8s linear infinite' }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="hsl(var(--primary) / 0.15)"
              strokeWidth="1"
              strokeDasharray="8 12"
            />
          </svg>
        </div>

        {/* Inner glowing ring */}
        <div 
          className="absolute inset-0 -m-4"
          style={{ animation: 'spin-slow 6s linear infinite' }}
        >
          <svg className="w-full h-full" viewBox="0 0 80 80">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="2"
              strokeDasharray="60 200"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          </svg>
        </div>

        {/* Orbiting dots */}
        <div 
          className="absolute inset-0 -m-10"
          style={{ animation: 'spin-slow 4s linear infinite' }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-lg"
            style={{ boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)' }}
          />
        </div>
        <div 
          className="absolute inset-0 -m-10"
          style={{ animation: 'spin-reverse 6s linear infinite' }}
        >
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/70"
            style={{ boxShadow: '0 0 8px hsl(var(--primary) / 0.8)' }}
          />
        </div>

        {/* Logo with breathe animation */}
        <div 
          className="relative bg-background rounded-full p-4 shadow-2xl"
          style={{
            animation: 'breathe 3s ease-in-out infinite',
            boxShadow: '0 0 40px hsl(var(--primary) / 0.1), 0 20px 40px hsl(var(--background) / 0.5)',
          }}
        >
          <img 
            src={onetimeLogo} 
            alt="OneTimeRecruit" 
            className="h-24 w-24 object-contain"
          />
        </div>
      </div>

      {/* Progress section */}
      <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Progress bar container */}
        <div className="relative w-64 h-1.5 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Animated shimmer background */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)',
              animation: 'shimmer 2s linear infinite',
            }}
          />
          {/* Progress fill */}
          <div 
            className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-150 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 12px hsl(var(--primary) / 0.6), 0 0 24px hsl(var(--primary) / 0.3)',
            }}
          >
            {/* Glowing end cap */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
              style={{
                boxShadow: '0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary) / 0.5)',
                animation: 'pulse-dot 1s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Progress percentage */}
        <div className="mt-6 text-center">
          <p 
            className="text-2xl font-light text-foreground/80 tracking-widest tabular-nums"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {Math.round(progress)}%
          </p>
          <p className="mt-2 text-sm text-muted-foreground/60 tracking-wider uppercase">
            Laden
          </p>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{ animation: 'line-glow 3s ease-in-out infinite' }}
      />

      {/* Custom keyframes */}
      <style>{`
        @keyframes background-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { 
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.6;
          }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.3;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes breathe {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.03);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-dot {
          0%, 100% { 
            transform: translate(50%, -50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translate(50%, -50%) scale(1.3);
            opacity: 0.7;
          }
        }
        
        @keyframes line-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
