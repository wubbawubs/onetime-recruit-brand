import { useState, useEffect } from 'react';
import { FileText, FileSpreadsheet, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllVacanciesForReport } from '@/data/mockReportsData';
import { exportCandidatesCSV, exportMonthlyReport, exportVacancyReport } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';

interface ReportsExportTabProps {
  partnerId?: string;
}

export function ReportsExportTab({ partnerId = 'all' }: ReportsExportTabProps) {
  const vacancies = getAllVacanciesForReport(partnerId);
  const [selectedVacancy, setSelectedVacancy] = useState(vacancies[0]?.id || '');
  const [selectedMonthlyVacancy, setSelectedMonthlyVacancy] = useState('all');
  const [selectedCSVVacancy, setSelectedCSVVacancy] = useState('all');
  const { toast } = useToast();

  // Update selected vacancies when partner filter changes
  useEffect(() => {
    const newVacancies = getAllVacanciesForReport(partnerId);
    if (newVacancies.length > 0 && !newVacancies.find(v => v.id === selectedVacancy)) {
      setSelectedVacancy(newVacancies[0].id);
    }
    // Reset monthly and CSV to 'all' when partner changes
    setSelectedMonthlyVacancy('all');
    setSelectedCSVVacancy('all');
  }, [partnerId, selectedVacancy]);

  const handleVacancyExport = () => {
    exportVacancyReport(selectedVacancy);
    toast({
      title: 'Export gestart',
      description: 'Je vacature rapport wordt nu gegenereerd.',
    });
  };

  const handleMonthlyExport = () => {
    exportMonthlyReport();
    toast({
      title: 'Export gestart',
      description: selectedMonthlyVacancy === 'all' 
        ? 'Je maandrapport voor alle vacatures wordt nu gegenereerd.'
        : 'Je maandrapport voor de geselecteerde vacature wordt nu gegenereerd.',
    });
  };

  const handleCSVExport = () => {
    exportCandidatesCSV();
    toast({
      title: 'CSV gedownload',
      description: selectedCSVVacancy === 'all'
        ? 'Alle kandidaten zijn geëxporteerd.'
        : 'Kandidaten voor de geselecteerde vacature zijn geëxporteerd.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Vacancy Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Vacature Rapport
          </CardTitle>
          <CardDescription>
            Download een PDF met KPI's voor één vacature: time to hire, funnel, instroom en activiteit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Select value={selectedVacancy} onValueChange={setSelectedVacancy}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Selecteer vacature" />
              </SelectTrigger>
              <SelectContent>
                {vacancies.map((vacancy) => (
                  <SelectItem key={vacancy.id} value={vacancy.id}>
                    <div className="flex items-center gap-2">
                      <span>{vacancy.title}</span>
                      {partnerId === 'all' && (
                        <span className="text-xs text-muted-foreground">({vacancy.partnerName})</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleVacancyExport} className="w-full sm:w-auto" disabled={!selectedVacancy}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Maandrapport
          </CardTitle>
          <CardDescription>
            Alle KPI's van de afgelopen maand: time to hire, funnel conversie, bronnen effectiviteit en doorlooptijden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Select value={selectedMonthlyVacancy} onValueChange={setSelectedMonthlyVacancy}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Selecteer vacature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle vacatures</SelectItem>
                {vacancies.map((vacancy) => (
                  <SelectItem key={vacancy.id} value={vacancy.id}>
                    <div className="flex items-center gap-2">
                      <span>{vacancy.title}</span>
                      {partnerId === 'all' && (
                        <span className="text-xs text-muted-foreground">({vacancy.partnerName})</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleMonthlyExport}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CSV Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
            CSV Kandidatenlijst
          </CardTitle>
          <CardDescription>
            Exporteer kandidaten met stage, bron, datum en score. Perfect voor eigen analyses of externe rapportages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Select value={selectedCSVVacancy} onValueChange={setSelectedCSVVacancy}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Selecteer vacature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle kandidaten</SelectItem>
                {vacancies.map((vacancy) => (
                  <SelectItem key={vacancy.id} value={vacancy.id}>
                    <div className="flex items-center gap-2">
                      <span>{vacancy.title}</span>
                      {partnerId === 'all' && (
                        <span className="text-xs text-muted-foreground">({vacancy.partnerName})</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleCSVExport}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
