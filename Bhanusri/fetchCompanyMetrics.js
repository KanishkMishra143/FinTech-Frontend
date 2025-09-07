// This script maps company names from companylist.csv to symbols in symbols.json,
// ...existing code...
// Usage: node fetchCompanyMetrics.js

const fs = require('fs');
const https = require('https');
const { parse } = require('csv-parse/sync');

// ...existing code...

// Read company list
const companyCsv = fs.readFileSync('companylist.csv', 'utf8');
const companies = parse(companyCsv, { columns: true });

// Read all symbols
const symbols = JSON.parse(fs.readFileSync('symbols.json'));

// Helper: Find best matching symbol for a company name
function findSymbol(companyName) {
  // Try exact match (case-insensitive)
  let match = symbols.find(s => s.description && s.description.trim().toLowerCase() === companyName.trim().toLowerCase());
  if (match) return match.symbol;
  // Try substring match (case-insensitive)
  match = symbols.find(s => s.description && s.description.toLowerCase().includes(companyName.toLowerCase()));
  if (match) return match.symbol;
  // Try ISIN match if available
  match = symbols.find(s => s.isin && companyName === s.isin);
  if (match) return match.symbol;
  return null;
}

// Fetch market cap for a symbol
function fetchMarketCap(symbol) {
  return new Promise((resolve, reject) => {
  // ...existing code...
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.marketCapitalization || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

(async () => {
  let results = [];
  let unmatched = [];
  for (const company of companies) {
    const symbol = findSymbol(company.name);
    let marketCap = null;
    if (symbol) {
      marketCap = await fetchMarketCap(symbol);
    } else {
      unmatched.push(company.name);
    }
    results.push({
      company_id: company.company_id,
      name: company.name,
      symbol: symbol || '',
      marketCap: marketCap
    });
    console.log(`Processed: ${company.name} | Symbol: ${symbol || 'N/A'} | MarketCap: ${marketCap || 'N/A'}`);
    await new Promise(r => setTimeout(r, 1100));
  }
  fs.writeFileSync('allcompanies.json', JSON.stringify(results, null, 2));
  if (unmatched.length > 0) {
    fs.writeFileSync('unmatched_companies.txt', unmatched.join('\n'));
    console.log(`Unmatched companies saved to unmatched_companies.txt (${unmatched.length})`);
  }
  console.log('Saved all company metrics to allcompanies.json');
})();
