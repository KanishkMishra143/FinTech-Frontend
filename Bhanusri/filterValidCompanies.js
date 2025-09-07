// Filters companies with valid marketCap and sharePrice from allcompanies.json
// Usage: node filterValidCompanies.js

const fs = require('fs');

const companies = JSON.parse(fs.readFileSync('allcompanies.json', 'utf8'));
const valid = companies.filter(c => c.marketCap !== null && c.sharePrice !== null);

fs.writeFileSync('allcompanies_valid.json', JSON.stringify(valid, null, 2));
console.log(`Saved ${valid.length} companies with valid metrics to allcompanies_valid.json`);
