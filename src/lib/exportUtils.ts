import { allCandidates } from '@/data/mockCandidatesData';
import { getReportsOverview, getVacancyReport, getAllVacanciesForReport } from '@/data/mockReportsData';

// Export candidates to CSV
export function exportCandidatesCSV(): void {
  const headers = ['Naam', 'Email', 'Vacature', 'Stage', 'Bron', 'Score', 'Dagen in stage', 'Datum toegevoegd'];
  
  const rows = allCandidates.map(candidate => [
    candidate.name,
    candidate.email,
    candidate.currentVacancy,
    candidate.currentStage,
    candidate.source,
    candidate.score?.toString() || '-',
    candidate.daysInStage.toString(),
    candidate.addedDate,
  ]);

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.join(';'))
  ].join('\n');

  downloadFile(csvContent, 'kandidaten-export.csv', 'text/csv;charset=utf-8;');
}

// Export monthly report (triggers print dialog for now)
export function exportMonthlyReport(): void {
  // Create a printable report
  const overview = getReportsOverview();
  
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Maandrapport - OneTime Rooted</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        h2 { font-size: 18px; margin-top: 32px; margin-bottom: 16px; color: #374151; }
        .subtitle { color: #6b7280; margin-bottom: 32px; }
        .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .metric-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; }
        .metric-value { font-size: 32px; font-weight: 700; }
        .metric-label { color: #6b7280; font-size: 14px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .table th, .table td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
        .table th { font-weight: 600; color: #374151; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <h1>Maandrapport</h1>
      <p class="subtitle">OneTime Rooted - ${new Date().toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}</p>
      
      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-value">${overview.timeToHire.avgDays}d</div>
          <div class="metric-label">Gemiddelde Time to Hire</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${overview.funnel.totalHired}</div>
          <div class="metric-label">Totaal Hires</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${overview.funnel.overallConversion}%</div>
          <div class="metric-label">Conversie</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${overview.funnel.totalIn}</div>
          <div class="metric-label">Totaal Kandidaten</div>
        </div>
      </div>
      
      <h2>Pipeline Funnel</h2>
      <table class="table">
        <tr><th>Stage</th><th>Aantal</th><th>Conversie</th></tr>
        ${overview.funnel.stages.map(s => `<tr><td>${s.name}</td><td>${s.count}</td><td>${s.conversionPct}%</td></tr>`).join('')}
      </table>
      
      <h2>Bronnen Effectiviteit</h2>
      <table class="table">
        <tr><th>Bron</th><th>Kandidaten</th><th>Hires</th><th>Conversie</th></tr>
        ${overview.sourceEffectiveness.sources.map(s => `<tr><td>${s.name}</td><td>${s.candidates}</td><td>${s.hires}</td><td>${s.conversionPct}%</td></tr>`).join('')}
      </table>
      
      <h2>Doorlooptijd per Fase</h2>
      <table class="table">
        <tr><th>Fase</th><th>Gem. dagen</th><th>Target</th></tr>
        ${overview.timeInStage.stages.map(s => `<tr><td>${s.name}</td><td>${s.avgDays}d</td><td>${s.targetDays}d</td></tr>`).join('')}
      </table>
    </body>
    </html>
  `;

  openPrintWindow(reportHTML);
}

// Export vacancy-specific report
export function exportVacancyReport(vacancyId: string): void {
  const report = getVacancyReport(vacancyId);
  
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vacature Rapport - ${report.title}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        h2 { font-size: 18px; margin-top: 32px; margin-bottom: 16px; color: #374151; }
        .subtitle { color: #6b7280; margin-bottom: 32px; }
        .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .metric-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; }
        .metric-value { font-size: 28px; font-weight: 700; }
        .metric-label { color: #6b7280; font-size: 14px; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500; }
        .status-green { background: #d1fae5; color: #065f46; }
        .status-amber { background: #fef3c7; color: #92400e; }
        .status-red { background: #fee2e2; color: #991b1b; }
        .advice { background: #f3f4f6; padding: 16px; border-radius: 8px; margin-top: 24px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .table th, .table td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
        .table th { font-weight: 600; color: #374151; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <h1>${report.title}</h1>
      <p class="subtitle">Vacature Rapport - ${new Date().toLocaleDateString('nl-NL')}</p>
      
      <span class="status ${report.status === 'op_koers' ? 'status-green' : report.status === 'risico' ? 'status-amber' : 'status-red'}">
        ${report.status === 'op_koers' ? 'Op koers' : report.status === 'risico' ? 'Risico' : 'Kritiek'}
      </span>
      
      <div class="metric-grid" style="margin-top: 24px;">
        <div class="metric-card">
          <div class="metric-value">${report.timeToFill}d</div>
          <div class="metric-label">Time to Fill (target: ${report.targetDays}d)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${report.healthScore}</div>
          <div class="metric-label">Health Score</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${report.instroom.total}</div>
          <div class="metric-label">Instroom (${report.instroom.period})</div>
        </div>
      </div>
      
      <h2>Pipeline Funnel</h2>
      <table class="table">
        <tr><th>Stage</th><th>Aantal</th></tr>
        ${report.funnel.map(s => `<tr><td>${s.stage}</td><td>${s.count}</td></tr>`).join('')}
      </table>
      
      <h2>Instroom per Bron</h2>
      <table class="table">
        <tr><th>Bron</th><th>Aantal</th></tr>
        ${report.instroom.bySource.map(s => `<tr><td>${s.source}</td><td>${s.count}</td></tr>`).join('')}
      </table>
      
      <div class="advice">
        <strong>Advies:</strong> ${report.advice}
      </div>
    </body>
    </html>
  `;

  openPrintWindow(reportHTML);
}

// Helper to download file
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Helper to open print window
function openPrintWindow(html: string): void {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
