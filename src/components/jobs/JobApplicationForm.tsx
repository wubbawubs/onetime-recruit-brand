import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, CheckCircle2, Loader2, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const applicationSchema = z.object({
  firstName: z.string().trim().min(1, 'Voornaam is verplicht').max(50, 'Maximaal 50 tekens'),
  lastName: z.string().trim().min(1, 'Achternaam is verplicht').max(50, 'Maximaal 50 tekens'),
  email: z.string().trim().email('Ongeldig e-mailadres').max(255, 'Maximaal 255 tekens'),
  phone: z.string().trim().min(10, 'Telefoonnummer is te kort').max(20, 'Maximaal 20 tekens').optional().or(z.literal('')),
  motivation: z.string().trim().max(2000, 'Maximaal 2000 tekens').optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'Je moet akkoord gaan met de privacyverklaring',
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  vacancyTitle: string;
  companyName: string;
  onSubmit?: (data: ApplicationFormData) => Promise<void>;
}

export function JobApplicationForm({ vacancyTitle, companyName, onSubmit }: JobApplicationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFileName, setCvFileName] = useState<string | null>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      motivation: '',
      privacyConsent: false,
    },
  });

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (onSubmit) {
        await onSubmit(data);
      }
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
        <CardContent className="pt-10 pb-10 text-center space-y-5">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <div className="relative rounded-full bg-primary/10 w-full h-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Sollicitatie verstuurd!</h3>
            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Bedankt voor je interesse in <span className="font-medium text-foreground">{vacancyTitle}</span> bij {companyName}. 
              We nemen zo snel mogelijk contact met je op.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 shadow-xl shadow-black/5 overflow-hidden">
      <CardHeader className="pb-2 space-y-1">
        <CardTitle className="text-xl font-semibold">Solliciteer direct</CardTitle>
        <CardDescription>Vul onderstaande gegevens in om te solliciteren</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Voornaam *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan" className="h-11 rounded-lg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Achternaam *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jansen" className="h-11 rounded-lg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">E-mailadres *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jan@voorbeeld.nl" className="h-11 rounded-lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Telefoonnummer</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06 12345678" className="h-11 rounded-lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CV Upload - Premium styling */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CV uploaden</label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`flex items-center justify-center gap-3 p-5 border-2 border-dashed rounded-xl transition-all duration-300 ${
                  cvFileName 
                    ? 'border-primary/40 bg-primary/5' 
                    : 'border-border/60 hover:border-[color:var(--client-primary)]/40 hover:bg-muted/30'
                }`}>
                  {cvFileName ? (
                    <>
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{cvFileName}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Sleep je CV hierheen of klik om te uploaden
                      </span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">PDF, DOC of DOCX (max 5MB)</p>
            </div>

            {/* Motivation */}
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Motivatie (optioneel)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Vertel kort waarom je geïnteresseerd bent in deze functie..." 
                      className="min-h-[100px] resize-none rounded-lg"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Privacy Consent */}
            <FormField
              control={form.control}
              name="privacyConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-lg bg-muted/30 border border-border/40">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer leading-relaxed">
                      Ik ga akkoord met de{' '}
                      <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
                        privacyverklaring
                      </a>{' '}
                      en geef toestemming om mijn gegevens te verwerken voor deze sollicitatie. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button - Premium styling */}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--client-primary)',
                boxShadow: isSubmitting ? 'none' : '0 4px 14px -3px var(--client-primary)'
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verzenden...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Verstuur sollicitatie
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
