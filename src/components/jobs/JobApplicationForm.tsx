import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      // Simulate API call
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
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Sollicitatie verstuurd!</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Bedankt voor je interesse in de functie {vacancyTitle} bij {companyName}. 
            We nemen zo snel mogelijk contact met je op.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Solliciteer direct</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voornaam *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan" {...field} />
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
                    <FormLabel>Achternaam *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jansen" {...field} />
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
                  <FormLabel>E-mailadres *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jan@voorbeeld.nl" {...field} />
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
                  <FormLabel>Telefoonnummer</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06 12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CV Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">CV uploaden</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-[var(--client-primary)] transition-colors">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {cvFileName || 'Sleep je CV hierheen of klik om te uploaden'}
                  </span>
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
                  <FormLabel>Motivatie (optioneel)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Vertel kort waarom je geïnteresseerd bent in deze functie..." 
                      className="min-h-[100px] resize-none"
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                      Ik ga akkoord met de{' '}
                      <a href="#" className="underline hover:text-foreground">
                        privacyverklaring
                      </a>{' '}
                      en geef toestemming om mijn gegevens te verwerken voor deze sollicitatie. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              style={{ 
                backgroundColor: 'var(--client-primary)',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verzenden...
                </>
              ) : (
                'Verstuur sollicitatie'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
