import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">UpTo<span>Skills</span></div>
        <ul className="nav-links">
          <li>Global ranking</li>
          <li>Ranking by countries</li>
          <li>Ranking by categories</li>
          <li>How to Use</li>
        </ul>
        <div className="nav-buttons">
          <button className="signup">Signup</button>
          <button className="login">Login</button>
        </div>
      </nav>

      <section className="content">
        <h2>HOW TO USE THE WEBSITE ?</h2>
        <ul>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
        </ul>

        <h2>VIDEO TO GUIDE YOU HOW TO USE WEBSITE?</h2>
        <div className="video-box">
          <p>(Video Of HOW TO USE WEBSITE?)</p>
          <div className="upload-box">
            <p>Click here to upload a video</p>
            <div className="icon">🎥</div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <h4>What is the market capitalization of a company?</h4>
            <p>
              The market capitalization sometimes referred as Marketcap, is the
              value of a publicly listed company.
              <br />
              In most cases it can be easily calculated by multiplying the share
              price with the amount of outstanding shares.
            </p>
            <p>
              <strong>DISCLAIMER</strong>
              <br />
              UpToSkills is not associated in any way with ___WebsiteName___.com
              <br />
              Stock prices are delayed, the delay can range from a few minutes
              to several hours.
            </p>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>
              For inquiries or if you want to report a problem write to
              <a href="#"> UpToSkills.com</a>
            </p>

            <h4>Links</h4>
            <p className="links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </p>

            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-x-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 UpToSkills.com</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
