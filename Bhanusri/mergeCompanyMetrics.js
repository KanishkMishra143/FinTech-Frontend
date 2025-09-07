// Merges allcompanies.json and missing_companies_metrics.json, excluding entries with null/empty metrics
// Usage: node mergeCompanyMetrics.js

const fs = require('fs');

const main = JSON.parse(fs.readFileSync('allcompanies.json', 'utf8'));
const missing = JSON.parse(fs.readFileSync('missing_companies_metrics.json', 'utf8'));

function isValid(entry) {
  return entry.symbol && entry.symbol.length > 0 && entry.marketCap !== null && entry.sharePrice !== null;
}

// Combine and filter
const merged = [...main, ...missing].filter(isValid);

// Remove duplicates by symbol
const unique = Object.values(merged.reduce((acc, entry) => {
  acc[entry.symbol] = entry;
  return acc;
}, {}));

fs.writeFileSync('allcompanies_merged.json', JSON.stringify(unique, null, 2));
console.log(`Saved ${unique.length} companies with valid metrics to allcompanies_merged.json`);
