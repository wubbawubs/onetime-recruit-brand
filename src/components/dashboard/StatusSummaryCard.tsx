import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusSummaryCardProps {
  summaryText: string;
}

function parseMarkdown(text: string) {
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  
  return paragraphs.map((paragraph, pIndex) => {
    // Parse bold text within each paragraph
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
      <p key={pIndex} className="text-muted-foreground leading-relaxed">
        {content}
      </p>
    );
  });
}

export function StatusSummaryCard({ summaryText }: StatusSummaryCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Dit is de stand van zaken</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {parseMarkdown(summaryText)}
      </CardContent>
    </Card>
  );
}
