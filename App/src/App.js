import React, { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import HowToUse from "./components/HowToUse";
import MarketCapTable from "./components/MarketCapTable";
import CompaniesPage from "./components/CompaniesPage";
import { Routes, Route, Navigate } from "react-router-dom";
import CHeader from "./components/CHeader";
import CFooter from "./components/CFooter";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import ChatWidget from "./components/ChatWidget";
import Countries from "./components/Countries";
import UnlockAccess from "./components/UnlockAccess"; // ✅ new entry page

// ---- Layout wrapper for all pages after signup ----
function MainLayout({ children, setShowSignUp, setShowSignIn }) {
  return (
    <div className="bg-gradient-to-r from-[#FFA366] to-[#C3F0DB] p-6 min-h-screen">
      {/* Shared Navbar */}
      <CHeader setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />

      {/* Page Content */}
      {children}

      {/* Global Chat & Footer */}
      <ChatWidget />
      <CFooter />
    </div>
  );
}

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <Routes>
        {/* --- Default Unlock page (before signup) --- */}
        <Route
          path="/"
          element={
            <UnlockAccess
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            />
          }
        />

        {/* --- Routes after signup --- */}
        <Route
          path="/home"
          element={
            <MainLayout
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            >
              <LandingPage />
            </MainLayout>
          }
        />

        <Route
          path="/how-to-use"
          element={
            <MainLayout
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            >
              <HowToUse />
            </MainLayout>
          }
        />

        <Route
          path="/companies"
          element={
            <MainLayout
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            >
              <CompaniesPage />
            </MainLayout>
          }
        />

        <Route
          path="/countries"
          element={
            <MainLayout
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            >
              <Countries />
            </MainLayout>
          }
        />

        <Route
          path="/apple"
          element={
            <MainLayout
              setShowSignUp={setShowSignUp}
              setShowSignIn={setShowSignIn}
            >
              <MarketCapTable />
            </MainLayout>
          }
        />

        {/* Redirect any unknown routes to "/" */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* --- Global Modals for SignUp / SignIn --- */}
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
    </>
  );
}

export default App;
