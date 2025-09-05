import React from "react";

function App() {
  return (
    <div className="wrapper">
      <div className="card">
        <div className="logo">
          <span className="upto">UPTO</span>
          <span className="skills">SKILLS</span>
        </div>
        <h2>Recover Your Account</h2>
        <label htmlFor="recoveryInput">
          Enter Your Email ID Or Recovery Phone No.
        </label>
        <input
          type="text"
          id="recoveryInput"
          placeholder="Enter your email or phone"
        />
        <button>Next</button>
        <p className="footer">
          Need more help? <a href="#">Contact Support</a>
        </p>
      </div>
    </div>
  );
}

export default App;
