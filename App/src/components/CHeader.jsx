import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";

const CHeader = ({ setShowSignUp, setShowSignIn }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
      {/* Logo - clickable */}
      <div className="text-2xl font-bold">
        <Link to="/">
          <img
            src={logo}
            alt="UptoSkills Logo"
            className="w-32 mb-2 cursor-pointer"
          />
        </Link>
      </div>

      {/* Nav links + Search */}
      <div className="flex items-center gap-6 font-medium">
        <ul className="flex gap-6">
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/companies">Global ranking</Link>
          </li>

          <li className="cursor-pointer hover:text-blue-500">
            Ranking by countries
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/how-to-use">How to Use</Link>
          </li>
        </ul>

        {/* SearchBar placed here */}
        <div className="flex items-center ml-8 mr-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Auth buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowSignUp(true)}
          className="px-5 py-2 rounded-full font-bold bg-blue-500 text-white hover:bg-blue-600"
        >
          SignUp
        </button>
        <button
          onClick={() => setShowSignIn(true)}
          className="px-5 py-2 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600"
        >
          SignIn
        </button>
      </div>
    </nav>
  );
};

export default CHeader;
