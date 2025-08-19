import React from "react";

const CHeader = ({ setPage }) => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-orange-500">
        UpTo<span className="text-teal-500">Skills</span>
      </div>
      <ul className="flex gap-6 font-medium">
        <li className="cursor-pointer hover:text-blue-500">Global ranking</li>
        <li className="cursor-pointer hover:text-blue-500">Ranking by countries</li>
        <li className="cursor-pointer hover:text-blue-500">Ranking by categories</li>
        <li className="cursor-pointer hover:text-blue-500"><a href="#htu">How to Use </a></li>
      </ul>
      <div className="flex gap-3">
        <button
          onClick={() => setPage("signup")}
          className="px-5 py-2 rounded-full font-bold bg-blue-500 text-white hover:bg-blue-600"
        >
          SignUp
        </button>
        <button
          onClick={() => setPage("signin")}
          className="px-5 py-2 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600"
        >
          SignIn
        </button>
      </div>
    </nav>
  );
};

export default CHeader;
