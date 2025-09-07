// Logs full Yahoo Finance search results for each company in missing_companies_clean.json
// Usage: node logYahooSearchResults.js

const fs = require('fs');
const yahooFinance = require('yahoo-finance2').default;

const companies = JSON.parse(fs.readFileSync('missing_companies_clean.json', 'utf8'));

(async () => {
  let logs = [];
  for (const company of companies) {
    let searchResults = null;
    try {
      searchResults = await yahooFinance.search(company.name);
    } catch (e) {
      searchResults = { error: e.message };
    }
    logs.push({
      name: company.name,
      searchResults
    });
    console.log(`Searched: ${company.name}`);
    await new Promise(r => setTimeout(r, 1100));
  }
  fs.writeFileSync('yahoo_search_results.json', JSON.stringify(logs, null, 2));
  console.log('Saved full Yahoo Finance search results to yahoo_search_results.json');
})();
