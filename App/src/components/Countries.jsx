import React from "react";

const Countries = () => {
  const countries = [
    { rank: 1, country: "USA", companies: 580, totalCap: "₹1,254,320 T" },
    { rank: 2, country: "China", companies: 370, totalCap: "₹842,760 T" },
    { rank: 3, country: "Japan", companies: 210, totalCap: "₹654,110 T" },
    { rank: 4, country: "India", companies: 195, totalCap: "₹542,480 T" },
    { rank: 5, country: "UK", companies: 160, totalCap: "₹398,230 T" },
    { rank: 6, country: "Germany", companies: 155, totalCap: "₹389,700 T" },
    { rank: 7, country: "France", companies: 120, totalCap: "₹310,500 T" },
    { rank: 8, country: "Canada", companies: 100, totalCap: "₹268,430 T" },
    { rank: 9, country: "South Korea", companies: 95, totalCap: "₹244,110 T" },
    { rank: 10, country: "Brazil", companies: 80, totalCap: "₹210,540 T" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#FFA366] to-[#C3F0DB] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Global Ranking by Countries
      </h1>

      <div className="flex justify-center">
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">Rank</th>
                <th className="p-3">Country</th>
                <th className="p-3">No. of Companies</th>
                <th className="p-3">Total Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((row) => (
                <tr key={row.rank} className="border-b hover:bg-gray-50">
                  <td className="p-3">{row.rank}</td>
                  <td className="p-3 font-medium">{row.country}</td>
                  <td className="p-3">{row.companies}</td>
                  <td className="p-3">{row.totalCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Countries;
