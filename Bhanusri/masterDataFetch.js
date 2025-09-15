//database to fetch the master data
//this file will contain the data fetching logic for all the master data
const { Client } = require('pg');

const client = new Client({
  user: 'postgres.bumuydwxxkjtzobhmxfh',
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  database: 'postgres',
  password: 'B2AdrhT6mCTp3k',
  port: 5432,
  // For Supabase, accept self-signed certificates
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => {
    console.error('Connection error:', err);
    if (err.code) console.error('Error code:', err.code);
    if (err.message) console.error('Error message:', err.message);
    if (err.stack) console.error('Error stack:', err.stack);
    if (err instanceof AggregateError) {
      for (const e of err.errors) {
        console.error('AggregateError sub-error:', e);
      }
    }
  });

// Handle unexpected client errors gracefully
client.on('error', (err) => {
  console.error('Unexpected client error:', err);
});

module.exports = client;
//fetching company metrics
// This script maps company names from companylist.csv to symbols in symbols.json,
// ...existing code...
// Usage: node fetchCompanyMetrics.js

const fs = require('fs');
const https = require('https');
const { parse } = require('csv-parse/sync');
const client = require('./databasepg');

// ...existing code...

// Read company list
const companyCsvRaw1 = fs.readFileSync('companylist.csv', 'utf8');
const companies1 = parse(companyCsvRaw1, { columns: true });

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
  for (const company of companies1.slice(0, LIMIT)) {
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
//fetching company symbolsmetrics
// This script reads company names and stock symbols from companylist_clean.csv,
// ...existing code...
// Usage: node fetchCompanySymbolsMetrics.js

const fs2 = require('fs');
const { parse: parse2 } = require('csv-parse/sync');
const yahooFinance = require('yahoo-finance2').default;

// Read company list (expects columns: Company Name, Stock Symbol)
const companyCsvClean2 = fs2.readFileSync('companylist_clean.csv', 'utf8');
const companiesClean2 = parse2(companyCsvClean2, { columns: true });


// Fetch market cap and share price for a symbol using yahoo-finance2
async function fetchYahooFinanceData(symbol) {
  try {
    const quote = await yahooFinance.quoteSummary(symbol, { modules: ['price', 'summaryDetail'] });
    const priceData = quote.price || {};
    const summaryData = quote.summaryDetail || {};
    const marketCap = summaryData.marketCap || priceData.marketCap || null;
    const sharePrice = priceData.regularMarketPrice || null;
    return {
      marketCap: marketCap ? marketCap : null,
      sharePrice: sharePrice ? sharePrice : null
    };
  } catch (e) {
    return { marketCap: null, sharePrice: null };
  }
}


function isFileUpdatedToday(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const stats = fs.statSync(filePath);
  const fileDate = new Date(stats.mtime);
  const today = new Date();
  return fileDate.getFullYear() === today.getFullYear() &&
         fileDate.getMonth() === today.getMonth() &&
         fileDate.getDate() === today.getDate();
}

(async () => {
  if (isFileUpdatedToday('allcompanies.json')) {
    console.log('allcompanies.json is already updated today. Skipping fetch.');
    return;
  }
  let results = [];
  let missing = [];
  for (const company of companiesClean2) {
        const symbol = company['Stock Symbol'];
        let marketCap = null;
        let sharePrice = null;
        if (symbol) {
          const data = await fetchYahooFinanceData(symbol);
          marketCap = data.marketCap ? data.marketCap : null;
          sharePrice = data.sharePrice ? data.sharePrice : null;
        }
        results.push({
          name: company['Company Name'],
          symbol: symbol || '',
          marketCap: marketCap,
          sharePrice: sharePrice
        });
        if (!marketCap || !sharePrice) {
          missing.push({ name: company['Company Name'], symbol: symbol || '', marketCap, sharePrice });
        }
        console.log(`Processed: ${company['Company Name']} | Symbol: ${symbol || 'N/A'} | MarketCap: ${marketCap || 'N/A'} | SharePrice: ${sharePrice || 'N/A'}`);
        await new Promise(r => setTimeout(r, 1100));
      }
  fs.writeFileSync('allcompanies.json', JSON.stringify(results, null, 2));
  if (missing.length > 0) {
    fs.writeFileSync('missing_companies.json', JSON.stringify(missing, null, 2));
    console.log(`Saved companies with missing data to missing_companies.json (${missing.length})`);
  }
  console.log('Saved all company metrics to allcompanies.json');
})();
