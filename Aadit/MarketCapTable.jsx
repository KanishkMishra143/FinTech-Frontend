import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fallbackData = [
  { rank: 1, name: 'Apple', ticker: 'AAPL', marketCap: '₹285.216 T', price: '₹18,986', change: '▼0.99%', country: 'USA' },
  { rank: 2, name: 'Microsoft', ticker: 'MSFT', marketCap: '₹248.464 T', price: '₹33,423', change: '▼1.31%', country: 'USA' },
  { rank: 3, name: 'NVIDIA', ticker: 'NVDA', marketCap: '₹237.897 T', price: '₹9,750', change: '▼5.74%', country: 'USA' },
  { rank: 4, name: 'Amazon', ticker: 'AMZN', marketCap: '₹182.683 T', price: '₹17,238', change: '▼2.23%', country: 'USA' },
  { rank: 5, name: 'Alphabet (Google)', ticker: 'GOOG', marketCap: '₹173.427 T', price: '₹14,325', change: '▼3.27%', country: 'USA' },
  { rank: 6, name: 'Saudi Aramco', ticker: '2222.SR', marketCap: '₹147.937 T', price: '₹611.68', change: '▲0.38%', country: 'S. Arabia' },
  { rank: 7, name: 'Meta Platforms (Facebook)', ticker: 'META', marketCap: '₹132.674 T', price: '₹52,365', change: '▼2.45%', country: 'USA' },
  { rank: 8, name: 'Berkshire Hathaway', ticker: 'BRK-B', marketCap: '₹98.548 T', price: '₹45,699', change: '▲0.82%', country: 'USA' },
  { rank: 9, name: 'TSMC', ticker: 'TSM', marketCap: '₹77.123 T', price: '₹14,870', change: '▼4.09%', country: 'Taiwan' },
  { rank: 10, name: 'Tesla', ticker: 'TSLA', marketCap: '₹75.000 T', price: '₹23,317', change: '▼5.58%', country: 'USA' },
  // Add more entries as needed...
];

const MarketCapTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/companies') // Change if deployed
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error("Error fetching company data:", error);
        // fallback to static data if API fails
        setCompanies(fallbackData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-center text-xl font-bold mb-4">
        Largest Companies by Marketcap
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Market Cap</th>
                <th className="p-2">Price</th>
                <th className="p-2">Change</th>
                <th className="p-2">Country</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, idx) => (
                <tr key={company.id || idx} className="border-b hover:bg-gray-100">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{company.name}</td>
                  <td className="p-2">{company.marketCap}</td>
                  <td className="p-2">{company.price}</td>
                  <td className="p-2">{company.change || "-"}</td>
                  <td className="p-2">{company.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="bg-yellow-500 text-white px-6 py-2 rounded shadow">
          Unlock details after signup
        </button>
      </div>
    </section>
  );
};

export default MarketCapTable;
