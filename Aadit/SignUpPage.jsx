import React, { useState } from 'react';
import logo from '../assets/logo.png';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    identifier: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        // redirect or show confirmation
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans">
      <img src={logo} alt="UptoSkills Logo" className="w-40 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Sign Up to UpToSkills</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Fullname </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Enter Your Email ID Or Phone No.</label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
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
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => alert('Google Sign-Up')}
          className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition"
        >
          <i className="fab fa-google text-white text-lg"></i>
          Sign Up with Google
        </button>

        <p className="text-center mt-4 text-sm">
          already have an account? <a href="/signin" className="text-blue-600 font-semibold">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;