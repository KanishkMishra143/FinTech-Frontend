import React, { useState } from 'react';
import logo from '../assets/logo.png';

const SignInPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [showRecover, setShowRecover] = useState(false); // modal toggle

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.identifier && credentials.password) {
      alert('Login successful!');
    } else {
      alert('Please enter all fields.');
    }
  };

  return (
    <div className="w-full max-w-5xl min-h-[60vh] mx-auto flex flex-col items-center justify-center bg-white text-black font-sans">
      <img src={logo} alt="UptoSkills Logo" className="w-40 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Sign In to UpToSkills</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Enter Your Email ID Or Phone No.</label>
          <input
            type="text"
            name="identifier"
            value={credentials.identifier}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow"
            required
          />
        </div>

        <div className="text-right text-sm">
          <button
            type="button"
            onClick={() => setShowRecover(true)}
            className="text-blue-400 italic"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => alert('Google Sign-In')}
          className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition"
        >
          <i className="fab fa-google text-white text-lg"></i>
          Sign In with Google
        </button>

        <p className="text-center mt-4 text-sm">
          don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </a>
        </p>
      </form>

      {/* Recover Password Modal */}
      {showRecover && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center relative">
            <button
              onClick={() => setShowRecover(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="flex flex-col items-center justify-center">
              <img src={logo} alt="UptoSkills Logo" className="w-32 mb-2" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Recover Your Account</h2>
            <label className="block mb-2 text-sm font-medium text-left">
              Enter Your Email ID Or Recovery Phone No.
            </label>
            <input
              type="text"
              placeholder="Enter your email or phone"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring focus:ring-blue-300 outline-none"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition">
              Next
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Need more help?{' '}
              <a href="#" className="text-blue-500 font-semibold">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
