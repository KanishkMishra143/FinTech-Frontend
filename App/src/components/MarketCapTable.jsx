import React, { useState } from "react";
import logoImg from "../assets/apple.png";
import marketcapImg from "../assets/marketcap.png";
import revenueImg from "../assets/revenue.png";
import priceHistoryImg from "../assets/price-history.png";
import psRatioImg from "../assets/ps-ratio.png";
import facebookImg from "../assets/facebook.png";

const AppleHero = () => (
  <div className="flex items-center gap-6 mb-8">
    <img src={logoImg} alt="Apple Logo" className="w-25 h-20 rounded-full" />
    <div>
      <h1 className="text-3xl font-bold">Apple Inc. (AAPL)</h1>
      <p className="text-gray-600">
        Cupertino, California · Technology · NASDAQ
      </p>
    </div>
  </div>
);

const MarketCapTable = () => {
  const [activeTab, setActiveTab] = useState("Market Cap");
  const [showMore, setShowMore] = useState(false);


  const options = [
    "Market Cap",
    "Revenue",
    "Earnings",
    "Price History",
    "P/E Ratio",
    "P/S Ratio",
    "Competitors",
  ];

  const moreOptions = [
    "Basic EPS (₹)", "Diluted EPS (₹)", "Cash EPS (₹)", "Book Value/Share (₹)", "Dividend/Share (₹)",
    "Revenue from Operations/Share (₹)", "PBDIT/Share (₹)", "PBIT/Share (₹)", "PBT/Share (₹)", "Net Profit/Share (₹)",
    "Gross profit margin (%)", "Effective tax rate (%)", "Return on investment (%)", "Retention ratio (%)",
    "PBDIT Margin (%)", "PBIT Margin (%)", "PBT Margin (%)", "Net Profit Margin (%)", "Operating Profit Margin (%)",
    "EBIT Margin (%)", "EBITDA Margin (%)", "Total Debt/Equity (x)", "Current Ratio (x)", "Quick Ratio (x)", "Debt Ratio",
    "Long-term Debt/Equity (x)", "Short-term Debt/Equity (x)", "Net Debt/Equity (x)", "Interest Coverage Ratio (x)",
    "Shareholder Equity Ratio (%)", "Altman Z-Score", "Cash Ratio (x)", "Operating Leverage Ratio (x)", "Asset Turnover Ratio (%)",
    "Inventory Turnover Ratio", "Receivables Turnover Ratio", "Days Sales Outstanding (DSO) (in days)",
    "Days Payable Outstanding (DPO)  (in days)", "Days Inventory Outstanding (DIO)  (in days)",
    "Cash Conversion Cycle (CCC)  (in days)", "Fixed Asset Turnover Ratio (x)", "Working Capital Turnover Ratio (x)",
    "Revenue/Employee (₹)", "PE Ratio", "PS Ratio", "PB Ratio", "P/TBV Ratio", "P/FCF Ratio", "P/OCF Ratio",
    "tangible Book Value/Share (₹)", "Net Asset Value (NAV)/Share (₹)", "Capital Employed/Share (₹)",
    "Revenue Growth (%)", "Net Income Growth (%)", "EBIT Growth (%)", "EBITDA Growth (%)", "Dividend Payout Ratio (%)",
    "Dividend Yield (%)", "Return on Equity (ROE) (%)", "Return on Capital Employed (ROCE) (%)", "Return on Assets (ROA) (%)",
    "Operating Cash Flow/EBITDA", "Free Cash Flow/Net Income", "Capex/Sales (%)", "Depreciation/Fixed Assets (%)"
  ];

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setShowMore(false);
  };

  return (
    <div className="bg-gradient-to-r from-[#FFA366] to-[#C3F0DB] min-h-screen flex flex-col">

      {/* Main content */}
      <div className="flex-grow max-w-6xl mx-auto px-4 py-10">
        {/* Ranking Bar (Tabs) */}
        <div className="bg-white shadow-lg rounded-xl p-4 mb-6 border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">📊 Rank by</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {options.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleSelect(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setShowMore(!showMore)}
              >
                ⋮ More
              </button>

              {showMore && (
                <div className="absolute mt-2 w-64 bg-white shadow-lg rounded-lg border max-h-48 overflow-y-auto z-10">
                  {moreOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          {activeTab === "Market Cap" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">Market Cap</h2>
              <p className="mb-4 text-gray-700">
                Market capitalization (market cap) is the total value of a company’s
                outstanding shares of stock. It is calculated by multiplying the
                current share price by the total number of shares outstanding.
              </p>
              <img src={marketcapImg} alt="Market Cap Chart" className="w-full rounded-lg mb-6" />
            </section>
          )}

          {activeTab === "Revenue" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">Revenue</h2>
              <p className="mb-4 text-gray-700">
                Revenue is the total income generated by a company from its normal
                business operations.
              </p>
              <img src={revenueImg} alt="Revenue Chart" className="w-full rounded-lg mb-6" />
            </section>
          )}

          {activeTab === "Earnings" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">Earnings</h2>
              <p className="mb-4 text-gray-700">
                Earnings represent the net profit of a company after all expenses and taxes are deducted.
              </p>
              <img src={revenueImg} alt="Earnings Chart" className="w-full rounded-lg mb-6" />
            </section>
          )}

          {activeTab === "Price History" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">Price History</h2>
              <p className="mb-4 text-gray-700">
                Price history shows how the company’s stock price has moved over time.
              </p>
              <img src={priceHistoryImg} alt="Price History Chart" className="w-full rounded-lg mb-6" />
            </section>
          )}

          {activeTab === "P/E Ratio" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">P/E Ratio</h2>
              <p className="mb-4 text-gray-700">
                The price-to-earnings (P/E) ratio measures a company’s share price relative to earnings.
              </p>
              <img src={psRatioImg} alt="P/E Ratio Chart" className="w-full rounded-lg mb-6" />
            </section>
          )}

          {activeTab === "P/S Ratio" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">P/S Ratio</h2>
              <p className="mb-4 text-gray-700">
                The price-to-sales (P/S) ratio compares stock price to revenues.
              </p>
              <img src={psRatioImg} alt="P/S Ratio Chart" className="w-full rounded-lg mb-6" />
            </section>
          )}

          {activeTab === "Competitors" && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">Competitors</h2>
              <p className="mb-4 text-gray-700">
                Competitors are other companies operating in the same industry.
              </p>
              <img src={facebookImg} alt="Competitors Chart" className="w-1/2 mx-auto rounded-lg mb-6" />
            </section>
          )}

          {moreOptions.includes(activeTab) && (
            <section>
              <AppleHero />
              <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
              <p className="mb-4 text-gray-700">
                Showing data for <strong>{activeTab}</strong>.
              </p>
              <img src={marketcapImg} alt={`${activeTab} chart`} className="w-full rounded-lg mb-6" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketCapTable;
