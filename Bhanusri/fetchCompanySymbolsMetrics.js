// This script reads company names and stock symbols from companylist_clean.csv,
// ...existing code...
// Usage: node fetchCompanySymbolsMetrics.js

const fs = require('fs');
const { parse } = require('csv-parse/sync');
const yahooFinance = require('yahoo-finance2').default;

// Read company list (expects columns: Company Name, Stock Symbol)
const companyCsv = fs.readFileSync('companylist_clean.csv', 'utf8');
const companies = parse(companyCsv, { columns: true });


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
  for (const company of companies) {
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
