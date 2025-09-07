// Fetches market cap and share price for companies in missing_companies_final.json
// Usage: node fetchFinalMissingCompanyMetrics.js

const fs = require('fs');
const yahooFinance = require('yahoo-finance2').default;

const companies = JSON.parse(fs.readFileSync('missing_companies_final.json', 'utf8'));

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
  for (const company of companies) {
    let marketCap = null;
    let sharePrice = null;
    if (company.symbol) {
      const metrics = await fetchMetrics(company.symbol);
      marketCap = metrics.marketCap;
      sharePrice = metrics.sharePrice;
    }
    results.push({
      name: company.name,
      symbol: company.symbol,
      marketCap,
      sharePrice
    });
    console.log(`Processed: ${company.name} | Symbol: ${company.symbol || 'N/A'} | MarketCap: ${marketCap || 'N/A'} | SharePrice: ${sharePrice || 'N/A'}`);
    await new Promise(r => setTimeout(r, 1100));
  }
  fs.writeFileSync('missing_companies_metrics.json', JSON.stringify(results, null, 2));
  console.log('Saved metrics to missing_companies_metrics.json');
})();
