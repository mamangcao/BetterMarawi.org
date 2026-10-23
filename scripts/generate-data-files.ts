import fs from 'fs';
import path from 'path';
import { MARAWI_BARANGAYS } from '../src/data/barangays';
import { generateBarangaysCSV } from '../src/lib/csv';

// Writes the public open-data files in public/data. Only sourced datasets are exported:
// the barangay list (PSA PSGC and 2024 POPCEN). The budget, ordinance, and FDP files were
// dropped on Oct 23, 2026 because their contents have no source; add a dataset back only
// once its data is sourced.

const targetDir = path.resolve(__dirname, '../public/data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Barangays CSV & JSON
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

console.log(`Generated public/data/marawi-barangays.csv and .json (${MARAWI_BARANGAYS.length} barangays)`);
