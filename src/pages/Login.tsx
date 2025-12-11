import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock } from "lucide-react";
import onetimeLogo from "@/assets/onetime-logo.webp";

// SVG Root background illustration
const RootBackground = () => (
  <svg
    className="absolute bottom-0 left-0 right-0 w-full h-64 text-primary/5 pointer-events-none"
    viewBox="0 0 800 256"
    preserveAspectRatio="xMidYMax slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left root system */}
    <path
      d="M100 256 Q80 200 60 150 Q40 100 80 60"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "0ms" }}
    />
    <path
      d="M100 256 Q120 180 100 120"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "100ms" }}
    />
    <path
      d="M60 150 Q30 130 20 100"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "200ms" }}
    />
    <path
      d="M100 120 Q130 90 120 50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "300ms" }}
    />

    {/* Center-left root */}
    <path
      d="M300 256 Q280 180 300 100"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "150ms" }}
    />
    <path
      d="M300 180 Q260 150 240 100"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "250ms" }}
    />
    <path
      d="M300 140 Q340 110 360 60"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "350ms" }}
    />

    {/* Center root */}
    <path
      d="M400 256 Q400 200 400 140"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "50ms" }}
    />
    <path
      d="M400 200 Q360 160 340 120"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "200ms" }}
    />
    <path
      d="M400 200 Q440 160 460 120"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "200ms" }}
    />
    <path
      d="M400 140 Q380 100 400 50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "400ms" }}
    />

    {/* Center-right root */}
    <path
      d="M500 256 Q520 180 500 100"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "100ms" }}
    />
    <path
      d="M500 160 Q540 130 560 80"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "300ms" }}
    />
    <path
      d="M500 180 Q460 150 440 110"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "250ms" }}
    />

    {/* Right root system */}
    <path
      d="M700 256 Q720 200 740 150 Q760 100 720 60"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "0ms" }}
    />
    <path
      d="M700 256 Q680 180 700 120"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "100ms" }}
    />
    <path
      d="M740 150 Q770 130 780 100"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "200ms" }}
    />
    <path
      d="M700 120 Q670 90 680 50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-grow-root"
      style={{ animationDelay: "300ms" }}
    />

    {/* Small decorative roots */}
    <path d="M150 256 Q170 220 160 180" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "400ms" }} />
    <path d="M200 256 Q180 200 200 160" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "450ms" }} />
    <path d="M600 256 Q620 220 610 180" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "400ms" }} />
    <path d="M650 256 Q630 200 650 160" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "450ms" }} />
  </svg>
);

// Top decorative roots (inverted)
const TopRoots = () => (
  <svg
    className="absolute top-0 left-0 right-0 w-full h-32 text-primary/3 pointer-events-none rotate-180"
    viewBox="0 0 800 128"
    preserveAspectRatio="xMidYMin slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M100 128 Q80 80 100 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "500ms" }} />
    <path d="M250 128 Q270 70 250 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "550ms" }} />
    <path d="M550 128 Q530 70 550 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "550ms" }} />
    <path d="M700 128 Q720 80 700 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-grow-root" style={{ animationDelay: "500ms" }} />
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welkom terug!",
        description: "Je bent succesvol ingelogd.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Inloggen mislukt",
        description: "Controleer je e-mailadres en wachtwoord.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Background gradient with green glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      
      {/* Ambient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Root illustrations */}
      <RootBackground />
      <TopRoots />
      
      <Card className="w-full max-w-md relative z-10 shadow-xl border-border/50 animate-scale-in backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src={onetimeLogo} 
                alt="OneTime Rooted" 
                className="h-12 w-auto relative z-10"
              />
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold">Welkom terug</CardTitle>
          <CardDescription>
            Log in op je OneTime Rooted account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="naam@bedrijf.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 input-glow transition-shadow duration-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 input-glow transition-shadow duration-300"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-glow relative overflow-hidden group" 
              disabled={isSubmitting}
            >
              {/* Button background glow on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inloggen...
                  </>
                ) : (
                  "Inloggen"
                )}
              </span>
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 p-3 bg-muted/50 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo account:</strong><br />
              juliette@onetimerooted.nl / demo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
