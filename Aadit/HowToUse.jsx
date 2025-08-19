import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function HowToUse() {
  return (
    <div className="min-h-screen flex flex-col" id="htu">

      {/* Content Section */}
      <section className="px-16 py-10">
        <h2 className="text-xl font-semibold uppercase mb-6">How to use the website ?</h2>
        <ul className="mb-10 space-y-3 list-disc list-inside">
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
        </ul>

        <h2 className="text-xl font-semibold uppercase mb-4">Video to guide you how to use website?</h2>
        <div className="text-center">
          <p>(Video Of HOW TO USE WEBSITE?)</p>
          <div className="w-full max-w-lg h-72 mx-auto mt-5 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
            <p className="mb-3">Click here to upload a video</p>
            <div className="text-3xl">🎥</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowToUse;
