import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import HowToUse from './components/HowToUse';
import MarketCapTable from './components/MarketCapTable';
import CompaniesPage from './components/CompaniesPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import CHeader from './components/CHeader';
import CFooter from './components/CFooter';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import ChatWidget from './components/ChatWidget';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#FFA366] to-[#C3F0DB] p-6 min-h-screen">
      {/* Navbar always present */}
      <CHeader setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />

      {/* Page routes with modal setters passed */}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            />
          }
        />
        <Route
          path="/how-to-use"
          element={
            <HowToUse
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            />
          }
        />
        <Route
          path="/companies"
          element={
            <CompaniesPage
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            />
          }
        />
        <Route
          path="/apple"
          element={
            <MarketCapTable
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global Chat & Footer */}
      <ChatWidget />
      <CFooter />

      {/* SignUp Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl"
            >
              &times;
            </button>
            <SignUpPage />
          </div>
        </div>
      )}

      {/* SignIn Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl"
            >
              &times;
            </button>
            <SignInPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
