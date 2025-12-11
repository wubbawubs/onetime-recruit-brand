import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Candidate } from "@/data/mockVacancyData";

interface SendEmailModalProps {
  candidate: Candidate;
  trigger?: React.ReactNode;
}

const emailTemplates = {
  invitation: {
    label: "Uitnodiging gesprek",
    subject: "Uitnodiging voor een gesprek - {vacature}",
    body: `Beste {voornaam},

Bedankt voor je sollicitatie op de functie {vacature}. We zijn onder de indruk van je profiel en nodigen je graag uit voor een kennismakingsgesprek.

Zou je ons laten weten wanneer je beschikbaar bent?

Met vriendelijke groet,
{recruiter}`,
  },
  rejection: {
    label: "Afwijzing",
    subject: "Update over je sollicitatie - {vacature}",
    body: `Beste {voornaam},

Bedankt voor je interesse in de functie {vacature} en de tijd die je hebt genomen om te solliciteren.

Na zorgvuldige overweging hebben we besloten om verder te gaan met andere kandidaten wiens profiel beter aansluit bij wat we op dit moment zoeken.

We wensen je veel succes met je verdere zoektocht.

Met vriendelijke groet,
{recruiter}`,
  },
  followup: {
    label: "Follow-up",
    subject: "Nog een vraag over je sollicitatie - {vacature}",
    body: `Beste {voornaam},

Naar aanleiding van je sollicitatie voor {vacature} heb ik nog een korte vraag.

[Voeg je vraag hier toe]

Hoor graag van je.

Met vriendelijke groet,
{recruiter}`,
  },
  custom: {
    label: "Eigen bericht",
    subject: "",
    body: "",
  },
};

export function SendEmailModal({ candidate, trigger }: SendEmailModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<keyof typeof emailTemplates>("invitation");
  const [subject, setSubject] = useState(emailTemplates.invitation.subject);
  const [body, setBody] = useState(emailTemplates.invitation.body);

  const firstName = candidate.name.split(" ")[0];

  const handleTemplateChange = (value: keyof typeof emailTemplates) => {
    setTemplate(value);
    setSubject(emailTemplates[value].subject);
    setBody(emailTemplates[value].body);
  };

  const handleSend = () => {
    toast({
      title: "E-mail verzonden",
      description: `E-mail is verstuurd naar ${candidate.name}.`,
    });
    setOpen(false);
  };

  // Preview with placeholders replaced
  const previewSubject = subject
    .replace("{voornaam}", firstName)
    .replace("{vacature}", "Senior Accountmanager B2B")
    .replace("{recruiter}", "Sarah HR");

  const previewBody = body
    .replace("{voornaam}", firstName)
    .replace("{vacature}", "Senior Accountmanager B2B")
    .replace("{recruiter}", "Sarah HR");

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Mail className="h-4 w-4 mr-2" />
      E-mail
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            E-mail versturen naar {candidate.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Template</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(emailTemplates).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Onderwerp van de e-mail"
            />
            <p className="text-xs text-muted-foreground">
              Preview: {previewSubject}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Bericht</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Beschikbare placeholders: {"{voornaam}"}, {"{vacature}"}, {"{recruiter}"}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Versturen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
