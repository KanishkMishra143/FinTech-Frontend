// Usage: node fetchSymbols.js
const fs = require('fs');
const yahooFinance = require('yahoo-finance2').default;

const exchanges = ['US', 'TO', 'V', 'EU', 'HK', 'L', 'T', 'SHG', 'SHH', 'F', 'N', 'SG', 'AS', 'MC', 'SW', 'AT', 'BR', 'MX', 'ST', 'HE', 'CO', 'TA', 'IST', 'SA', 'KQ', 'KS', 'IR', 'JK', 'BSE', 'NSE'];

async function fetchSymbolsYahoo(exchange) {
  try {
    const symbols = await yahooFinance.search('', { region: exchange });
    return symbols.quotes || [];
  } catch (e) {
    return [];
  }
}

(async () => {
  let allSymbols = [];
  for (const exchange of exchanges) {
    try {
      console.log(`Fetching symbols for exchange: ${exchange}`);
      const symbols = await fetchSymbolsYahoo(exchange);
      allSymbols = allSymbols.concat(symbols);
    } catch (e) {
      console.error(`Error fetching ${exchange}:`, e.message);
    }
  }
  fs.writeFileSync('symbols.json', JSON.stringify(allSymbols, null, 2));
  console.log(`Saved ${allSymbols.length} symbols to symbols.json`);
})();
