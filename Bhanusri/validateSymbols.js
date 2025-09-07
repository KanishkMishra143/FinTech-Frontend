// This script searches Yahoo Finance for the best matching symbol for each company name in companylist.csv.
// It updates companylist_validated.csv with the best symbol found for each company.
// Usage: node validateSymbols.js

const fs = require('fs');
const yahooFinance = require('yahoo-finance2').default;
const { parse } = require('csv-parse/sync');

const companyCsv = fs.readFileSync('companylist.csv', 'utf8');
const companies = parse(companyCsv, { columns: true });

async function findBestSymbol(companyName) {
  try {
    const results = await yahooFinance.search(companyName);
    // Prefer NSE symbols (ending with .NS), fallback to first result
    const nseResult = results.quotes.find(q => q.symbol.endsWith('.NS'));
    if (nseResult) return nseResult.symbol;
    if (results.quotes.length > 0) return results.quotes[0].symbol;
    return '';
  } catch (e) {
    return '';
  }
}

(async () => {
  let validated = [];
  for (const company of companies) {
    const bestSymbol = await findBestSymbol(company['Company Name']);
    validated.push({
      'Company Name': company['Company Name'],
      'Best Symbol': bestSymbol
    });
    console.log(`Company: ${company['Company Name']} | Best Symbol: ${bestSymbol || 'N/A'}`);
    await new Promise(r => setTimeout(r, 500)); // avoid rate limits
  }
  // Write validated symbols to new CSV
  const header = 'Company Name,Stock Symbol\n';
  const rows = validated.map(c => `${c['Company Name']},${c['Best Symbol']}`);
  fs.writeFileSync('companylist_validated.csv', header + rows.join('\n'));
  console.log('Validated symbols saved to companylist_validated.csv');
})();
