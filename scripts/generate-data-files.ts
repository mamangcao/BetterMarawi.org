import fs from 'fs';
import path from 'path';
import { MARAWI_BARANGAYS } from '../src/data/barangays';
import { BUDGET_BREAKDOWN_2026 } from '../src/data/budget';
import { ORDINANCES_LIST } from '../src/data/ordinances';
import { FDP_DOCUMENTS } from '../src/data/fdp';
import { generateBarangaysCSV, generateFDPCSV } from '../src/lib/csv';

const targetDir = path.resolve(__dirname, '../public/data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Barangays CSV & JSON
fs.writeFileSync(
  path.join(targetDir, 'marawi-barangays.csv'),
  generateBarangaysCSV(MARAWI_BARANGAYS),
  'utf-8'
);
fs.writeFileSync(
  path.join(targetDir, 'marawi-barangays.json'),
  JSON.stringify(MARAWI_BARANGAYS, null, 2),
  'utf-8'
);

// 2. Budget JSON
fs.writeFileSync(
  path.join(targetDir, 'marawi-budget-2026.json'),
  JSON.stringify(BUDGET_BREAKDOWN_2026, null, 2),
  'utf-8'
);

// 3. Ordinances JSON
fs.writeFileSync(
  path.join(targetDir, 'marawi-ordinances.json'),
  JSON.stringify(ORDINANCES_LIST, null, 2),
  'utf-8'
);

// 4. FDP CSV & JSON
fs.writeFileSync(
  path.join(targetDir, 'marawi-fdp-2026.csv'),
  generateFDPCSV(FDP_DOCUMENTS),
  'utf-8'
);
fs.writeFileSync(
  path.join(targetDir, 'marawi-fdp-2026.json'),
  JSON.stringify(FDP_DOCUMENTS, null, 2),
  'utf-8'
);

console.log('Successfully generated public open data files in public/data');

