// This script helps build a final mapping of company name to best Yahoo symbol from yahoo_search_results.json
// Usage: node buildFinalCompanyMapping.js

const fs = require('fs');

const searchResults = JSON.parse(fs.readFileSync('yahoo_search_results.json', 'utf8'));

function pickBestSymbol(quotes) {
  if (!quotes || quotes.length === 0) return '';
  // Prefer NSE (NSI) or BSE (BSE) symbols
  const nse = quotes.find(q => q.exchange === 'NSI');
  const bse = quotes.find(q => q.exchange === 'BSE');
  const best = nse || bse || quotes[0];
  return best.symbol || '';
}

const finalMapping = searchResults.map(entry => ({
  name: entry.name,
  symbol: pickBestSymbol(entry.searchResults?.quotes)
}));

fs.writeFileSync('missing_companies_final.json', JSON.stringify(finalMapping, null, 2));
console.log('Saved final company-symbol mapping to missing_companies_final.json');
