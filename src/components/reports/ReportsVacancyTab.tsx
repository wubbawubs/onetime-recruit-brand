import { useState } from 'react';
import { Clock, TrendingUp, Users, Heart, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllVacanciesForReport, getVacancyReport, VacancyReportData } from '@/data/mockReportsData';

export function ReportsVacancyTab() {
  const vacancies = getAllVacanciesForReport();
  const [selectedVacancy, setSelectedVacancy] = useState(vacancies[0]?.id || '');
  const report = getVacancyReport(selectedVacancy);

  const statusConfig = {
    op_koers: { label: 'Op koers', className: 'bg-emerald-500/10 text-emerald-600' },
    risico: { label: 'Risico', className: 'bg-amber-500/10 text-amber-600' },
    kritiek: { label: 'Kritiek', className: 'bg-red-500/10 text-red-600' },
  };

  const status = statusConfig[report.status];

  return (
    <div className="space-y-6">
      {/* Vacancy Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-muted-foreground">Selecteer vacature:</label>
        <Select value={selectedVacancy} onValueChange={setSelectedVacancy}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Kies een vacature" />
          </SelectTrigger>
          <SelectContent>
            {vacancies.map((vacancy) => (
              <SelectItem key={vacancy.id} value={vacancy.id}>
                {vacancy.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Time to Fill */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="h-4 w-4" />
              Time to Fill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.timeToFill}d</div>
            <p className="text-sm text-muted-foreground mt-1">
              Target: {report.targetDays}d
            </p>
            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${status.className}`}>
              {status.label}
            </span>
          </CardContent>
        </Card>

        {/* Health Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Heart className="h-4 w-4" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.healthScore}</div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  report.healthScore >= 70
                    ? 'bg-emerald-500'
                    : report.healthScore >= 50
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${report.healthScore}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Instroom */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              Instroom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.instroom.total}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Afgelopen {report.instroom.period}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Funnel & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2">
              {report.funnel.map((stage, index) => (
                <div key={stage.stage} className="flex items-center">
                  <div className="text-center">
                    <div className="text-xl font-bold">{stage.count}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[50px]">
                      {stage.stage === 'Eerste gesprek' ? 'EG' :
                       stage.stage === 'Tweede gesprek' ? 'TG' :
                       stage.stage}
                    </div>
                  </div>
                  {index < report.funnel.length - 1 && (
                    <span className="text-muted-foreground/50 mx-1">→</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Conversie: <span className="font-medium text-foreground">
                  {report.funnel.length > 0 && report.funnel[0].count > 0
                    ? Math.round((report.funnel[report.funnel.length - 1].count / report.funnel[0].count) * 100)
                    : 0}%
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instroom per bron */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              Instroom per bron
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.instroom.bySource.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <span className="text-sm">{source.source}</span>
                  <span className="font-medium">{source.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advice Card */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <p className="text-sm">
            <span className="font-medium">Advies: </span>
            {report.advice}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
