import { useState } from 'react';

const fallbackData = [
  { rank: 1, name: 'Apple', marketCap: '₹285.216 T', price: '₹18,986', change: '▼0.99%', country: 'USA' },
  { rank: 2, name: 'Microsoft', marketCap: '₹248.464 T', price: '₹33,423', change: '▼1.31%', country: 'USA' },
  { rank: 3, name: 'NVIDIA', marketCap: '₹237.897 T', price: '₹9,750', change: '▼5.74%', country: 'USA' },
  { rank: 4, name: 'Amazon', marketCap: '₹182.683 T', price: '₹17,238', change: '▼2.23%', country: 'USA' },
  { rank: 5, name: 'Alphabet (Google)', marketCap: '₹173.427 T', price: '₹14,325', change: '▼3.27%', country: 'USA' },
  { rank: 6, name: 'Saudi Aramco', marketCap: '₹147.937 T', price: '₹611.68', change: '▲0.38%', country: 'S. Arabia' },
  { rank: 7, name: 'Meta Platforms (Facebook)', marketCap: '₹132.674 T', price: '₹52,365', change: '▼2.45%', country: 'USA' },
  { rank: 8, name: 'Berkshire Hathaway', marketCap: '₹98.548 T', price: '₹45,699', change: '▲0.82%', country: 'USA' },
  { rank: 9, name: 'TSMC', marketCap: '₹77.123 T', price: '₹14,870', change: '▼4.09%', country: 'Taiwan' },
  { rank: 10, name: 'Tesla', marketCap: '₹75.000 T', price: '₹23,317', change: '▼5.58%', country: 'USA' },
];

const MarketCapTable = () => {
  const [companies] = useState(fallbackData); // directly use fallback data

  return (
    <section className="p-6">
      <h2 className="text-center text-xl font-bold mb-4">
        Largest Companies by Marketcap
      </h2>

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
              <tr key={idx} className="border-b hover:bg-gray-100">
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

      <div className="text-center mt-4">
        <button className="bg-yellow-500 text-white px-6 py-2 rounded shadow">
          Unlock details after signup
        </button>
      </div>
    </section>
  );
};

export default MarketCapTable;
