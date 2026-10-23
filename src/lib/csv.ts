import { BarangayRecord } from '@/types';

export function downloadFile(filename: string, content: string, mimeType: string) {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCSV(filename: string, csvContent: string) {
  downloadFile(filename, csvContent, 'text/csv;charset=utf-8;');
}

export function downloadJSON(filename: string, data: unknown) {
  downloadFile(filename, JSON.stringify(data, null, 2), 'application/json;charset=utf-8;');
}

/** Characters that make a spreadsheet treat a cell as a formula (CSV / formula injection) */
const FORMULA_LEAD = /^[=+\-@\t\r]/;

/**
 * Encode one CSV cell (RFC 4180), safe to open in a spreadsheet.
 * - Numbers are written as-is.
 * - Text starting with = + - @ tab or CR gets a leading apostrophe so spreadsheets show it as
 *   text instead of running it as a formula.
 * - Text is quoted when it contains a comma, quote, or line break (or when `quote` is set), and
 *   embedded quotes are doubled.
 */
export function csvCell(value: string | number, options: { quote?: boolean } = {}): string {
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : '';
  let text = value;
  if (FORMULA_LEAD.test(text)) text = `'${text}`;
  const needsQuotes = options.quote || /[",\r\n]/.test(text);
  return needsQuotes ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Join cells into one CSV row */
export function csvRow(cells: string[]): string {
  return cells.join(',');
}

export function generateBarangaysCSV(barangays: BarangayRecord[]): string {
  const header =
    'No,Barangay Name,PSGC Code (10-digit),Correspondence Code,Urban/Rural,Population (2024 POPCEN)';
  const rows = barangays.map((b) =>
    csvRow([
      csvCell(b.id),
      csvCell(b.name, { quote: true }),
      csvCell(b.psgcCode),
      csvCell(b.correspondenceCode),
      csvCell(b.classification),
      csvCell(b.populationLatest),
    ])
  );
  return [header, ...rows].join('\n');
}
