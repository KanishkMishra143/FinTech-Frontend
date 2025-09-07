// Express API to serve top 10 companies by market cap from company_metrics table
// Usage: node server.js

const express = require('express');
const cors = require('cors');
const client = require('./databasepg');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/companies', async (req, res) => {
  console.log('GET /companies called');
  try {
    const query = `
      SELECT name, symbol, market_cap, share_price, date
      FROM company_metrics
      ORDER BY market_cap DESC
      LIMIT 10;
    `;
    console.log('Running query:', query);
    const result = await client.query(query);
    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (e) {
    console.error('Error in /companies:', e);
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is running. Use /companies for top 10 companies.');
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
