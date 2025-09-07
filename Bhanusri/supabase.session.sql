SELECT name, symbol, market_cap, share_price, date
FROM company_metrics
WHERE market_cap IS NOT NULL
ORDER BY market_cap DESC
LIMIT 10;