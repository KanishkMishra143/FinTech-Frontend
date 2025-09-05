import React, { useState } from "react";
import "./RankingBar.css";

const RankingBar = () => {
  const [selected, setSelected] = useState("Market Cap");
  const [showMore, setShowMore] = useState(false);

  const options = [
    "Market Cap",
    "Earnings",
    "Revenue",
    "Employees",
    "P/E ratio",
    "Dividend %",
    "Market Cap Gain",
  ];

  const moreOptions = ["Assets", "Liabilities", "Net Income", "Growth Rate"];

  const handleSelect = (option) => {
    setSelected(option);
    setShowMore(false);
  };

  return (
    <div className="ranking-container">
      <h3 className="ranking-title">📊 Rank by</h3>

      <div className="ranking-options">
        {options.map((option) => (
          <button
            key={option}
            className={`ranking-btn ${selected === option ? "active" : ""}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}

        <div className="ranking-more">
          <button
            className="ranking-btn more-btn"
            onClick={() => setShowMore(!showMore)}
          >
            ⋮ More
          </button>

          {showMore && (
            <div className="dropdown">
              {moreOptions.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
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
  );
};

export default RankingBar;
