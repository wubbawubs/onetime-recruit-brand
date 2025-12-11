import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusSummaryCardProps {
  summaryText: string;
}

function parseMarkdown(text: string) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  
  return paragraphs.map((paragraph, pIndex) => {
    const parts = paragraph.split(/\*\*(.*?)\*\*/g);
    const content = parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong key={index} className="text-foreground font-semibold">
            {part}
          </strong>
        );
      }
      return part;
    });

    return (
      <p key={pIndex} className="text-sm text-muted-foreground leading-relaxed">
        {content}
      </p>
    );
  });
}

export function StatusSummaryCard({ summaryText }: StatusSummaryCardProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Dit is de stand van zaken</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {parseMarkdown(summaryText)}
      </CardContent>
    </Card>
  );
}
