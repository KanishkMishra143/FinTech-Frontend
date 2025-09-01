import React, { useState } from 'react';
import MarketCapTable from './MarketCapTable';
import CFooter from './CFooter';
import CHeader from './CHeader';
import HowToUse from './HowToUse';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';

const LandingPage = () => {
  const [page, setPage] = useState("home");

  return (
    <div>
  {/* Navbar stays fixed at top if needed */}
  <CHeader setPage={setPage} />

  <div className="mt-4">
    {page === "signup" && <SignUpPage setPage={setPage} />}
    {page === "signin" && <SignInPage setPage={setPage} />}
  </div>

  <MarketCapTable />
  <div className="text-center mt-8">
    <button className="bg-red-500 text-white px-6 py-2 rounded-full">Download</button>
  </div>
  <HowToUse />
  <CFooter />
</div>

  );
};

export default LandingPage;
