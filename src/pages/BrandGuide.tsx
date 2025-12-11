import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import onetimeLogo from "@/assets/onetime-logo.webp";

const BrandGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <img src={onetimeLogo} alt="Onetime Recruit" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Onetime Recruit</h1>
              <p className="text-muted-foreground">Brand & Design System Guide</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-12">
        {/* Logo Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Logo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Light Background</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-8 bg-background rounded-lg border">
                <img src={onetimeLogo} alt="Onetime Recruit Logo" className="h-20 w-auto" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dark Background</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-8 bg-sidebar rounded-lg">
                <img src={onetimeLogo} alt="Onetime Recruit Logo" className="h-20 w-auto" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Colors Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Kleurenpalet</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorSwatch name="Primary" variable="primary" className="bg-primary" textClass="text-primary-foreground" />
            <ColorSwatch name="Accent" variable="accent" className="bg-accent" textClass="text-accent-foreground" />
            <ColorSwatch name="Success" variable="success" className="bg-success" textClass="text-success-foreground" />
            <ColorSwatch name="Warning" variable="warning" className="bg-warning" textClass="text-warning-foreground" />
            <ColorSwatch name="Destructive" variable="destructive" className="bg-destructive" textClass="text-destructive-foreground" />
            <ColorSwatch name="Muted" variable="muted" className="bg-muted" textClass="text-muted-foreground" />
          </div>

          <h3 className="text-lg font-medium mt-8 mb-4">Neutrale Kleuren</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Background" variable="background" className="bg-background border" textClass="text-foreground" />
            <ColorSwatch name="Card" variable="card" className="bg-card border" textClass="text-card-foreground" />
            <ColorSwatch name="Secondary" variable="secondary" className="bg-secondary" textClass="text-secondary-foreground" />
            <ColorSwatch name="Border" variable="border" className="bg-border" textClass="text-foreground" />
          </div>

          <h3 className="text-lg font-medium mt-8 mb-4">Sidebar Kleuren</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Sidebar BG" variable="sidebar" className="bg-sidebar" textClass="text-sidebar-foreground" />
            <ColorSwatch name="Sidebar Primary" variable="sidebar-primary" className="bg-sidebar-primary" textClass="text-sidebar-primary-foreground" />
            <ColorSwatch name="Sidebar Accent" variable="sidebar-accent" className="bg-sidebar-accent" textClass="text-sidebar-accent-foreground" />
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Typografie</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Font Family: Inter</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H1 - 36px Bold</p>
                  <h1 className="text-4xl font-bold">Heading One</h1>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H2 - 28px Semibold</p>
                  <h2 className="text-3xl font-semibold">Heading Two</h2>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H3 - 22px Semibold</p>
                  <h3 className="text-2xl font-semibold">Heading Three</h3>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Body - 16px Regular</p>
                  <p className="text-base">Dit is een voorbeeld van body tekst. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Small - 14px Regular</p>
                  <p className="text-sm">Dit is een voorbeeld van kleine tekst.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Muted - 14px</p>
                  <p className="text-sm text-muted-foreground">Dit is een voorbeeld van muted tekst.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Accent CTA</Button>
                <Button className="bg-success hover:bg-success/90 text-success-foreground">Success</Button>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge className="bg-success text-success-foreground hover:bg-success/90">Actief</Badge>
                <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">In Review</Badge>
                <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">Nieuw</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Dit is een standaard card component.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card content komt hier.</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Card met Shadow</CardTitle>
                <CardDescription>Een card met subtiele schaduw.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Extra diepte door shadow-card.</p>
              </CardContent>
            </Card>
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Een card met meer elevation.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Meer prominentie door shadow-elevated.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Form Elements</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="example-input">Input Label</Label>
                  <Input id="example-input" placeholder="Placeholder tekst..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled-input">Disabled Input</Label>
                  <Input id="disabled-input" placeholder="Disabled..." disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing Guide */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Spacing & Border Radius</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Border Radius</p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center text-primary-foreground text-xs">sm</div>
                  <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">md</div>
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs">lg</div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">full</div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Base Unit: 4px (Tailwind spacing scale)</p>
                <p className="text-sm text-muted-foreground">Gebruik Tailwind's standaard spacing: p-1 (4px), p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px), etc.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

const ColorSwatch = ({ 
  name, 
  variable, 
  className, 
  textClass 
}: { 
  name: string; 
  variable: string; 
  className: string; 
  textClass: string;
}) => (
  <div className="space-y-2">
    <div className={`h-20 rounded-lg ${className} flex items-end p-2`}>
      <span className={`text-xs font-medium ${textClass}`}>{name}</span>
    </div>
    <p className="text-xs text-muted-foreground">--{variable}</p>
  </div>
);

export default BrandGuide;
