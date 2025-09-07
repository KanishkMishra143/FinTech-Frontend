// This script filters out rows with missing company names from companylist.csv and saves the result as companylist_clean.csv
// Usage: node cleanCompanyList.js

const fs = require('fs');
const { parse } = require('csv-parse/sync');

const csv = fs.readFileSync('companylist.csv', 'utf8');
const companies = parse(csv, { columns: true });

const filtered = companies.filter(c => c['Company Name'] && c['Company Name'].trim() !== '');

const header = 'Company Name,Stock Symbol\n';
const rows = filtered.map(c => `${c['Company Name']},${c['Stock Symbol']}`);
fs.writeFileSync('companylist_clean.csv', header + rows.join('\n'));
console.log('Cleaned company list saved to companylist_clean.csv');
