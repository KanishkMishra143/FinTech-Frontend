// This script attempts to find missing symbols and fetch metrics for companies in missing_companies.json
// Usage: node fetchMissingCompanyMetrics.js

const fs = require('fs');
const yahooFinance = require('yahoo-finance2').default;

const missingCompanies = JSON.parse(fs.readFileSync('missing_companies.json', 'utf8'));

async function searchSymbol(companyName) {
  try {
    const results = await yahooFinance.search(companyName);
    if (results && results.quotes && results.quotes.length > 0) {
      // Prefer NSE/BSE symbols, fallback to first result
      const nse = results.quotes.find(q => q.exchange === 'NSI');
      const bse = results.quotes.find(q => q.exchange === 'BSE');
      const best = nse || bse || results.quotes[0];
      return best.symbol;
    }
  } catch (e) {}
  return null;
}

async function fetchMetrics(symbol) {
  try {
    const quote = await yahooFinance.quoteSummary(symbol, { modules: ['price', 'summaryDetail'] });
    const priceData = quote.price || {};
    const summaryData = quote.summaryDetail || {};
    const marketCap = summaryData.marketCap || priceData.marketCap || null;
    const sharePrice = priceData.regularMarketPrice || null;
    return { marketCap, sharePrice };
  } catch (e) {
    return { marketCap: null, sharePrice: null };
  }
}

(async () => {
  let results = [];
  for (const company of missingCompanies) {
    let symbol = company.symbol;
    if (!symbol || symbol === company.name || symbol.length < 3) {
      symbol = await searchSymbol(company.name);
    }
    let marketCap = null;
    let sharePrice = null;
    if (symbol) {
      const metrics = await fetchMetrics(symbol);
      marketCap = metrics.marketCap;
      sharePrice = metrics.sharePrice;
    }
    results.push({
      name: company.name,
      symbol: symbol || '',
      marketCap,
      sharePrice
    });
    console.log(`Processed: ${company.name} | Symbol: ${symbol || 'N/A'} | MarketCap: ${marketCap || 'N/A'} | SharePrice: ${sharePrice || 'N/A'}`);
    await new Promise(r => setTimeout(r, 1100));
  }
  fs.writeFileSync('missing_companies_fetched.json', JSON.stringify(results, null, 2));
  console.log('Saved fetched metrics to missing_companies_fetched.json');
})();
