
const client = require('./databasepg'); // This connects to your database
const { fetchData } = require('./fetchData');

console.log('Starting market data update...');

// Fetch companies with valid symbols from the database
async function getCompaniesWithSymbols() {
  const res = await client.query("SELECT symbol FROM companies WHERE symbol IS NOT NULL AND symbol <> '';");
  return res.rows.map(row => row.symbol);
}

async function updateMarketData() {
  try {
  // Always fetch and upsert new data for all companies (removed daily check)
  const today = new Date().toISOString().slice(0, 10);

  // Fetch companies with valid symbols
  const companiesWithSymbols = await getCompaniesWithSymbols();
    console.log('Market data update complete!');
  } catch (e) {
    console.error('Error updating market data:', e.message);
  } finally {
    client.end();
  }
}

updateMarketData();