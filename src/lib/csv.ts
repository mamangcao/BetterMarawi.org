import { BarangayRecord, FDPDocument } from '@/types';

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

export function generateBarangaysCSV(barangays: BarangayRecord[]): string {
  const header =
    'No,Barangay Name,PSGC Code,District Cluster,2020 Census Population,Latest Census Population,Households,Classification,Sector Status';
  const rows = barangays.map(
    (b) =>
      `${b.id},"${b.name}",${b.psgcCode},"${b.district}",${b.population2020},${b.populationLatest},${b.households},${b.classification},"${b.zoneStatus}"`
  );
  return [header, ...rows].join('\n');
}

export function generateFDPCSV(docs: FDPDocument[]): string {
  const header = 'Code,Title,Frequency,Period,Date Posted,Responsible Office,File Size,Status';
  const rows = docs.map(
    (d) =>
      `"${d.code}","${d.title}","${d.frequency}","${d.latestPeriod}","${d.datePosted}","${d.officeResponsible}","${d.fileSize}","${d.status}"`
  );
  return [header, ...rows].join('\n');
}

