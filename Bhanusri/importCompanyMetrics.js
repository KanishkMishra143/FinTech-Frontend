// This script imports company metrics from allcompanies.json into PostgreSQL, skipping companies with missing data.
// Usage: node importCompanyMetrics.js

const fs = require('fs');
const client = require('./databasepg');

const data = JSON.parse(fs.readFileSync('allcompanies.json', 'utf8'));
const today = new Date().toISOString().slice(0, 10);

async function importData() {
  await client.connect();
  for (const company of data) {
    if (company.marketCap && company.sharePrice) {
      await client.query(
        'INSERT INTO company_metrics (symbol, shareprice, marketcap, date) VALUES ($1, $2, $3, $4)',
        [company.symbol, company.sharePrice, company.marketCap, today]
      );
      console.log(`Imported: ${company.symbol}`);
    } else {
      console.log(`Skipped (missing data): ${company.symbol}`);
    }
  }
  await client.end();
  console.log('Import complete.');
}

importData();
