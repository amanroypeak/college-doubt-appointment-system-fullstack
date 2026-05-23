import React from "react";
import { assets } from "../../assets/Use";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mt-10 mb-10">
        Doubt App
      </h1>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-6 pb-10">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          
          <img
            src={assets.Professor}
            alt="Professor"
            className="w-72 h-72 object-cover rounded-xl"
          />

          <p className="text-gray-600 text-lg leading-relaxed">
            Doubt App helps students connect with professors easily.
            It allows booking sessions, managing queries, and improving learning
            efficiently through a simple and user-friendly platform.
          </p>

        </div>
      </div>

    </div>
  );
}