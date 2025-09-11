// This script maps company names from companylist.csv to symbols in symbols.json,
// ...existing code...
// Usage: node fetchCompanyMetrics.js

const fs = require('fs');
const https = require('https');
const { parse } = require('csv-parse/sync');
const client = require('./databasepg');

// ...existing code...

// Read company list
const companyCsv = fs.readFileSync('companylist.csv', 'utf8');
const companies = parse(companyCsv, { columns: true });

// Set the limit for number of companies to process
const LIMIT = 100; // Change this value as needed

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
  await client.connect();
  let unmatched = [];
  for (const company of companies.slice(0, LIMIT)) {
    const symbol = findSymbol(company.name);
    let marketCap = null;
    if (symbol) {
      marketCap = await fetchMarketCap(symbol);
      // Upsert logic: avoids duplicate entries for same symbol/date
      const today = new Date().toISOString().slice(0, 10);
      await client.query(
        `INSERT INTO company_metrics (symbol, shareprice, marketcap, date)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (symbol, date) DO UPDATE
         SET shareprice = EXCLUDED.shareprice, marketcap = EXCLUDED.marketcap`,
        [symbol, null, marketCap, today]
      );
      console.log(`Imported/Updated: ${company.name} | Symbol: ${symbol} | MarketCap: ${marketCap || 'N/A'}`);
    } else {
      unmatched.push(company.name);
      console.log(`Unmatched: ${company.name}`);
    }
    await new Promise(r => setTimeout(r, 1100));
  }
  await client.end();
  if (unmatched.length > 0) {
    fs.writeFileSync('unmatched_companies.txt', unmatched.join('\n'));
    console.log(`Unmatched companies saved to unmatched_companies.txt (${unmatched.length})`);
  }
  console.log('All company metrics imported to database.');
})();
