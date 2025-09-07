// Filters out entries in missing_companies.json where name looks like an ID (e.g., starts with 'INE' and is all uppercase/alphanumeric)
// Usage: node cleanMissingCompanies.js

const fs = require('fs');

const missingCompanies = JSON.parse(fs.readFileSync('missing_companies.json', 'utf8'));

function isValidName(name) {
  // Exclude names that look like IDs (e.g., INE...)
  return !(name && /^INE[A-Z0-9]+$/.test(name));
}

const cleaned = missingCompanies.filter(c => isValidName(c.name));

fs.writeFileSync('missing_companies_clean.json', JSON.stringify(cleaned, null, 2));
console.log(`Saved ${cleaned.length} valid companies to missing_companies_clean.json`);
