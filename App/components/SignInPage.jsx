import React, { useState } from 'react';
import logo from '../assets/logo.png';

const SignInPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
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
          <a href="/forgot-password" className="text-blue-400 italic">Forget Password?</a>
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
          don’t have an account? <a href="/signup" className="text-blue-600 font-semibold">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
