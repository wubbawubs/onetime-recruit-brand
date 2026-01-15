import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, Check, Sun, Moon, Mail, Users, Settings, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  EMAIL_TEMPLATES,
  TEMPLATE_METADATA,
  TEMPLATE_MOCK_DATA,
  renderEmailToHtml,
  getEmailSubject,
  type EmailTemplateSlug,
} from '@/lib/emailTemplates';

export default function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateSlug>('partner-invite');
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const templateMeta = TEMPLATE_METADATA[selectedTemplate];
  const mockProps = TEMPLATE_MOCK_DATA[selectedTemplate];
  const subject = getEmailSubject(selectedTemplate, mockProps);

  const handleCopyHtml = () => {
    const html = renderEmailToHtml(selectedTemplate, mockProps);
    navigator.clipboard.writeText(html);
    setCopied(true);
    toast({
      title: 'HTML gekopieerd',
      description: 'De template HTML is gekopieerd naar je klembord.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user':
        return <Users className="h-3 w-3" />;
      case 'candidate':
        return <Mail className="h-3 w-3" />;
      case 'system':
        return <Settings className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'user':
        return 'Gebruiker';
      case 'candidate':
        return 'Kandidaat';
      case 'system':
        return 'Systeem';
      default:
        return category;
    }
  };

  // Render template preview
  const renderPreview = () => {
    const Template = EMAIL_TEMPLATES[selectedTemplate];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Template {...(mockProps as any)} />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 page-enter">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Email Templates</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Production-ready email templates voor Resend
            </p>
          </div>
          <Button onClick={handleCopyHtml} variant="outline" className="gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Gekopieerd!' : 'Kopieer HTML'}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar - Template Selection */}
          <Card className="xl:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value="all" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b px-4">
                  <TabsTrigger value="all" className="text-xs">Alle</TabsTrigger>
                  <TabsTrigger value="user" className="text-xs">Gebruiker</TabsTrigger>
                  <TabsTrigger value="candidate" className="text-xs">Kandidaat</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="p-2 space-y-1">
                {Object.entries(TEMPLATE_METADATA).map(([slug, meta]) => (
                  <button
                    key={slug}
                    onClick={() => setSelectedTemplate(slug as EmailTemplateSlug)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTemplate === slug
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{meta.name}</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1">
                        {getCategoryIcon(meta.category)}
                        {getCategoryLabel(meta.category)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {meta.description}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content - Preview */}
          <div className="xl:col-span-3 space-y-4">
            {/* Controls */}
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Preview modus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-muted-foreground" />
                      <Switch
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                        id="dark-mode"
                      />
                      <Moon className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="dark-mode" className="text-sm">
                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Onderwerp</p>
                    <p className="text-sm font-medium">{subject}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Info */}
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <h2 className="font-semibold">{templateMeta.name}</h2>
                    <p className="text-sm text-muted-foreground">{templateMeta.description}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Badge variant="outline">slug: {selectedTemplate}</Badge>
                    <Badge variant="secondary" className="gap-1">
                      {getCategoryIcon(templateMeta.category)}
                      {getCategoryLabel(templateMeta.category)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Preview */}
            <Card className="overflow-hidden">
              <div
                className={`transition-colors ${
                  darkMode ? 'bg-[#0f1419]' : 'bg-[#f4f7f4]'
                }`}
                style={{
                  padding: '24px',
                  minHeight: '600px',
                }}
              >
                <div
                  className="email-preview-frame"
                  style={{
                    colorScheme: darkMode ? 'dark' : 'light',
                  }}
                >
                  {renderPreview()}
                </div>
              </div>
            </Card>

            {/* Placeholder Variables */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Beschikbare variabelen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(mockProps).map((key) => (
                    <Badge key={key} variant="outline" className="font-mono text-xs">
                      {`{{${key}}}`}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
