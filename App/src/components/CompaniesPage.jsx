import React from 'react';

// Company data
const companies = [
  { rank: 1, name: "Apple", cap: "₹285,216 T", price: "₹18,986", country: "USA", icon: "fab fa-apple" },
  { rank: 2, name: "Microsoft", cap: "₹248,464 T", price: "₹23,423", country: "USA", icon: "fab fa-microsoft" },
  { rank: 3, name: "Amazon", cap: "₹182,683 T", price: "₹12,238", country: "USA", icon: "fab fa-amazon" },
  { rank: 4, name: "Google", cap: "₹173,427 T", price: "₹14,345", country: "USA", icon: "fab fa-google" },
  { rank: 5, name: "Meta", cap: "₹132,674 T", price: "₹25,365", country: "USA", icon: "fab fa-facebook" },
  { rank: 6, name: "Berkshire Hathaway", cap: "₹198,648 T", price: "₹4,659", country: "USA", icon: "fas fa-building" },
  { rank: 7, name: "JPMorgan Chase", cap: "₹344,758 T", price: "₹20,995", country: "USA", icon: "fas fa-university" },
  { rank: 8, name: "Exxon Mobil", cap: "₹270,680 T", price: "₹10,136", country: "USA", icon: "fas fa-gas-pump" },
  { rank: 9, name: "Toyota", cap: "₹234,768 T", price: "₹15,144", country: "Japan", icon: "fas fa-car" },
  { rank: 10, name: "Samsung", cap: "₹274,080 T", price: "₹8,378", country: "S. Korea", icon: "fas fa-mobile" },
   { rank: 11, name: "Intel", cap: "₹237,877 T", price: "₹71,746", country: "USA", icon: "fas fa-microchip" },
  { rank: 12, name: "Saudi Aramco", cap: "₹174,937 T", price: "₹8,938", country: "S. Arabia", icon: "fas fa-oil-can" },
  { rank: 13, name: "TSMC", cap: "₹171,237 T", price: "₹14,878", country: "Taiwan", icon: "fas fa-microchip" },
  { rank: 14, name: "Netflix", cap: "₹35,585 T", price: "₹83,191", country: "USA", icon: "fas fa-tv" },
  { rank: 15, name: "Broadcom", cap: "₹72,243 T", price: "₹75,865", country: "USA", icon: "fas fa-broadcast-tower" },
  { rank: 16, name: "Eli Lilly", cap: "₹63,627 T", price: "₹78,468", country: "USA", icon: "fas fa-pills" },
  { rank: 17, name: "Walmart", cap: "₹59,547 T", price: "₹7,233", country: "USA", icon: "fas fa-shopping-cart" },
  { rank: 18, name: "Visa", cap: "₹56,902 T", price: "₹29,448", country: "USA", icon: "fab fa-cc-visa" },
  { rank: 19, name: "Tencent", cap: "₹50,893 T", price: "₹5,627", country: "China", icon: "fab fa-weixin" },
  { rank: 20, name: "Mastercard", cap: "₹42,903 T", price: "₹47,095", country: "USA", icon: "fab fa-cc-mastercard" }
];

const CompaniesPage = () => {
    
  return (
    <div className="bg-gradient-to-r from-[#FFA366] to-[#C3F0DB] min-h-screen flex flex-col">
    <div className="min-h-screen bg-gradient-to-r from-[#FFA366] to-[#C3F0DB] flex flex-col items-center py-12">

      <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
        Top Companies by Market Capitalization
      </h1>

      <div className="overflow-x-auto w-11/12 md:w-4/5 lg:w-3/4">
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800 text-left">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Market Cap</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Country</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {companies.map((company) => (
              <tr
                key={company.rank}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-semibold">{company.rank}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <i className={`${company.icon} text-lg text-gray-600`}></i>
                  {company.name}
                </td>
                <td className="py-3 px-4">{company.cap}</td>
                <td className="py-3 px-4">{company.price}</td>
                <td className="py-3 px-4">{company.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default CompaniesPage;
