import React from 'react';
import logo from '../assets/logo.png';

const CFooter = () => (
  <footer className="mt-auto px-16 py-10">
    <div className="flex flex-wrap gap-10 justify-between">
      
      {/* Column 1 */}
      <div className="flex-1 min-w-[280px]">
        <h4 className="font-semibold mb-3">What is the market capitalization of a company?</h4>
        <p className="text-sm text-gray-800">
          The market capitalization sometimes referred as Marketcap, is the value of a publicly listed company. <br />
          In most cases it can be easily calculated by multiplying the share price with the amount of outstanding shares.
        </p>
        <p className="text-sm mt-4 text-gray-800">
          <strong>DISCLAIMER</strong>
          <br />
          UpToSkills is not associated in any way with __WebsiteName.com <br />
          Stock prices are delayed, the delay can range from a few minutes to several hours.
        </p>
      </div>

      {/* Column 2 */}
      <div className="flex-1 min-w-[280px]">
        <h4 className="font-semibold mb-3">Contact</h4>
        <p className="text-sm">
          For inquiries or if you want to report a problem write to
          <a href="#" className="text-blue-500 ml-1">UpToSkills.com</a>
        </p>

        <h4 className="font-semibold mt-5 mb-2">Links</h4>
        <div className="space-y-1">
          <a href="#" className="text-gray-800 underline font-medium block">Privacy Policy</a>
          <a href="#" className="text-gray-800 underline font-medium block">Terms & Conditions</a>
        </div>

        <div className="space-y-1">
           <a href="#" className="hover:text-blue-500 text-3xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-blue-500 text-3xl"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="hover:text-blue-500 text-3xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-500 text-3xl"><i className="fab fa-linkedin"></i></a>
            </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-6 pt-3 flex justify-center">
          <img src={logo} alt="UptoSkills Logo" className="w-40 mb-4" />
        </div>
  </footer>
);

export default CFooter;
