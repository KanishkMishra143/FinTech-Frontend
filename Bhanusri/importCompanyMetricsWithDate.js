// Creates company_metrics table and imports data from allcompanies_merged.json
// Usage: node importCompanyMetricsWithDate.js

const fs = require('fs');
const client = require('./databasepg');

const companies = JSON.parse(fs.readFileSync('allcompanies_merged.json', 'utf8'));
const today = new Date().toISOString().slice(0, 10);

async function createTable() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS company_metrics (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      symbol TEXT UNIQUE NOT NULL,
      market_cap BIGINT,
      share_price NUMERIC,
      date DATE NOT NULL
    );
  `);
  console.log('Table company_metrics is ready.');
}

async function importData() {
  let inserted = 0;
  for (const company of companies) {
    try {
      await client.query(
        `INSERT INTO company_metrics (name, symbol, market_cap, share_price, date)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (symbol, date) DO UPDATE SET market_cap = $3, share_price = $4`,
        [company.name, company.symbol, company.marketCap, company.sharePrice, today]
      );
      inserted++;
    } catch (e) {
      console.error(`Error importing ${company.name}:`, e.message);
    }
  }
  console.log(`Imported ${inserted} companies into company_metrics.`);
  await client.end();
}

(async () => {
  await createTable();
  await importData();
})();
