import { useEffect, useState, useMemo } from "react";
import onetimeLogo from "@/assets/onetime-logo.webp";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Generate floating leaf particles
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 3,
      rotation: Math.random() * 360,
    })), []
  );

  useEffect(() => {
    setMounted(true);
    const duration = 2500;
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
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 40%, hsl(142 40% 95%) 0%, hsl(var(--background)) 60%)',
          animation: 'background-breathe 6s ease-in-out infinite',
        }}
      />

      {/* Floating leaf particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `leaf-float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <svg 
            width={particle.size * 2} 
            height={particle.size * 3} 
            viewBox="0 0 10 15" 
            fill="none"
            style={{ transform: `rotate(${particle.rotation}deg)` }}
          >
            <path 
              d="M5 0C5 0 0 5 0 10C0 12.5 2.5 15 5 15C7.5 15 10 12.5 10 10C10 5 5 0 5 0Z" 
              fill="hsl(142 40% 60% / 0.3)"
            />
            <path 
              d="M5 3V13M5 6L3 8M5 9L7 11" 
              stroke="hsl(142 40% 50% / 0.4)" 
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}

      {/* Main logo container */}
      <div 
        className={`relative transition-all duration-1000 ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
        style={{ marginBottom: '4rem' }}
      >
        {/* Animated roots growing outward */}
        <svg 
          className="absolute inset-0 -m-24 w-[calc(100%+12rem)] h-[calc(100%+12rem)]"
          viewBox="0 0 200 200"
          style={{ animation: 'roots-grow 3s ease-out forwards' }}
        >
          <defs>
            <linearGradient id="root-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 40% 45%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(142 40% 35%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Root paths - animated with stroke-dasharray */}
          <g className="roots" style={{ transformOrigin: 'center' }}>
            {/* Main root down-left */}
            <path 
              d="M100 100 Q80 120 60 150 Q50 170 45 190" 
              stroke="url(#root-gradient)" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 150,
                strokeDashoffset: 150,
                animation: 'draw-root 2s ease-out 0.5s forwards'
              }}
            />
            {/* Branch from main */}
            <path 
              d="M70 135 Q55 145 40 155" 
              stroke="url(#root-gradient)" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 50,
                strokeDashoffset: 50,
                animation: 'draw-root 1s ease-out 1.2s forwards'
              }}
            />
            
            {/* Main root down-right */}
            <path 
              d="M100 100 Q120 120 140 150 Q150 170 155 190" 
              stroke="url(#root-gradient)" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 150,
                strokeDashoffset: 150,
                animation: 'draw-root 2s ease-out 0.7s forwards'
              }}
            />
            {/* Branch from main */}
            <path 
              d="M130 135 Q145 145 160 155" 
              stroke="url(#root-gradient)" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 50,
                strokeDashoffset: 50,
                animation: 'draw-root 1s ease-out 1.4s forwards'
              }}
            />
            
            {/* Left horizontal root */}
            <path 
              d="M100 100 Q70 105 40 115 Q20 120 10 125" 
              stroke="url(#root-gradient)" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 120,
                strokeDashoffset: 120,
                animation: 'draw-root 1.8s ease-out 0.9s forwards'
              }}
            />
            
            {/* Right horizontal root */}
            <path 
              d="M100 100 Q130 105 160 115 Q180 120 190 125" 
              stroke="url(#root-gradient)" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 120,
                strokeDashoffset: 120,
                animation: 'draw-root 1.8s ease-out 1.1s forwards'
              }}
            />

            {/* Small root tendrils */}
            <path 
              d="M55 160 Q45 175 35 185" 
              stroke="url(#root-gradient)" 
              strokeWidth="1" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animation: 'draw-root 0.8s ease-out 1.8s forwards'
              }}
            />
            <path 
              d="M145 160 Q155 175 165 185" 
              stroke="url(#root-gradient)" 
              strokeWidth="1" 
              fill="none"
              strokeLinecap="round"
              style={{ 
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animation: 'draw-root 0.8s ease-out 2s forwards'
              }}
            />
          </g>
        </svg>

        {/* Outer organic ring */}
        <div 
          className="absolute inset-0 -m-10"
          style={{ animation: 'ring-rotate 20s linear infinite' }}
        >
          <svg className="w-full h-full" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="organic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(142 40% 50%)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="hsl(142 40% 40%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(142 40% 50%)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <circle
              cx="70"
              cy="70"
              r="65"
              fill="none"
              stroke="hsl(142 40% 50% / 0.1)"
              strokeWidth="1"
            />
            <circle
              cx="70"
              cy="70"
              r="65"
              fill="none"
              stroke="url(#organic-gradient)"
              strokeWidth="2"
              strokeDasharray="30 20 50 30"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Inner counter-rotating ring */}
        <div 
          className="absolute inset-0 -m-6"
          style={{ animation: 'ring-rotate-reverse 12s linear infinite' }}
        >
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="hsl(142 40% 50% / 0.15)"
              strokeWidth="1"
              strokeDasharray="5 10"
            />
          </svg>
        </div>

        {/* Pulsing glow behind logo */}
        <div 
          className="absolute inset-0 -m-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(142 40% 50% / 0.2) 0%, transparent 70%)',
            animation: 'glow-pulse 2.5s ease-in-out infinite',
          }}
        />

        {/* Orbiting seeds */}
        <div 
          className="absolute inset-0 -m-8"
          style={{ animation: 'ring-rotate 5s linear infinite' }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ animation: 'seed-pulse 2s ease-in-out infinite' }}
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <ellipse cx="4" cy="6" rx="3" ry="5" fill="hsl(142 40% 45%)" />
              <ellipse cx="4" cy="6" rx="2" ry="4" fill="hsl(142 40% 55%)" opacity="0.5" />
            </svg>
          </div>
        </div>
        <div 
          className="absolute inset-0 -m-8"
          style={{ animation: 'ring-rotate-reverse 7s linear infinite' }}
        >
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{ animation: 'seed-pulse 2.5s ease-in-out infinite 0.5s' }}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <ellipse cx="3" cy="5" rx="2.5" ry="4" fill="hsl(142 40% 50%)" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Logo with organic shadow */}
        <div 
          className="relative bg-background rounded-full p-5"
          style={{
            animation: 'logo-breathe 4s ease-in-out infinite',
            boxShadow: '0 0 60px hsl(142 40% 50% / 0.15), 0 20px 50px hsl(var(--background) / 0.8), inset 0 0 20px hsl(142 40% 95% / 0.3)',
          }}
        >
          <img 
            src={onetimeLogo} 
            alt="OneTime Rooted" 
            className="h-28 w-28 object-contain"
          />
        </div>
      </div>

      {/* Progress section */}
      <div className={`relative transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Progress bar with organic styling */}
        <div className="relative w-72 h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(142 40% 50% / 0.2), transparent)',
              animation: 'shimmer 2.5s linear infinite',
            }}
          />
          {/* Progress fill with gradient */}
          <div 
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-200 ease-out"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(142 40% 45%), hsl(142 50% 55%))',
              boxShadow: '0 0 15px hsl(142 40% 50% / 0.5), 0 0 30px hsl(142 40% 50% / 0.3)',
            }}
          >
            {/* Glowing tip */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(142 50% 60%) 0%, hsl(142 40% 50%) 50%, transparent 70%)',
                animation: 'tip-glow 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Progress text */}
        <div className="mt-8 text-center">
          <p 
            className="text-3xl font-light tracking-widest tabular-nums"
            style={{ 
              color: 'hsl(142 30% 35%)',
              fontVariantNumeric: 'tabular-nums',
              textShadow: '0 2px 10px hsl(142 40% 50% / 0.2)',
            }}
          >
            {Math.round(progress)}%
          </p>
          <p className="mt-3 text-sm text-muted-foreground/70 tracking-[0.3em] uppercase font-medium">
            Growing
          </p>
        </div>
      </div>

      {/* Bottom decorative roots */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <svg 
          className="absolute bottom-0 w-full h-full" 
          viewBox="0 0 1200 150" 
          preserveAspectRatio="none"
          style={{ animation: 'bottom-roots-grow 2s ease-out 1s forwards', opacity: 0 }}
        >
          <path 
            d="M0 150 Q100 100 200 120 Q300 80 400 110 Q500 70 600 100 Q700 60 800 90 Q900 50 1000 80 Q1100 40 1200 70 L1200 150 Z" 
            fill="hsl(142 40% 50% / 0.05)"
          />
          <path 
            d="M0 150 Q150 110 300 130 Q450 90 600 120 Q750 80 900 110 Q1050 70 1200 100 L1200 150 Z" 
            fill="hsl(142 40% 50% / 0.03)"
          />
        </svg>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes background-breathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        
        @keyframes leaf-float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { 
            transform: translateY(-15px) rotate(-5deg);
            opacity: 0.7;
          }
          75% { transform: translateY(-40px) rotate(5deg); }
        }
        
        @keyframes draw-root {
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ring-rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.15);
            opacity: 0.3;
          }
        }
        
        @keyframes seed-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        
        @keyframes logo-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes tip-glow {
          0%, 100% { 
            transform: translate(50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translate(50%, -50%) scale(1.4);
            opacity: 0.5;
          }
        }
        
        @keyframes bottom-roots-grow {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
