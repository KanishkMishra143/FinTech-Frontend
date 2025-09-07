// Imports valid company metrics from allcompanies_valid.json into PostgreSQL
// Usage: node importValidCompanyMetrics.js

const fs = require('fs');
const { Client } = require('pg');
const dbConfig = require('./databasepg');

const companies = JSON.parse(fs.readFileSync('allcompanies_valid.json', 'utf8'));

(async () => {
  const client = new Client(dbConfig);
  await client.connect();
  let inserted = 0;
  for (const company of companies) {
    try {
      await client.query(
        'INSERT INTO companies (name, symbol, market_cap, share_price) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol) DO UPDATE SET market_cap = $3, share_price = $4',
        [company.name, company.symbol, company.marketCap, company.sharePrice]
      );
      inserted++;
    } catch (e) {
      console.error(`Error importing ${company.name}:`, e.message);
    }
  }
  await client.end();
  console.log(`Imported ${inserted} companies into the database.`);
})();
