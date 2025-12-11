import { Card, CardContent } from "@/components/ui/card";

interface StatusSummaryCardProps {
  summaryText: string;
}

function parseMarkdownBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="text-foreground font-semibold">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export function StatusSummaryCard({ summaryText }: StatusSummaryCardProps) {
  return (
    <Card className="shadow-card">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Dit is de stand van zaken
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {parseMarkdownBold(summaryText)}
        </p>
      </CardContent>
    </Card>
  );
}
