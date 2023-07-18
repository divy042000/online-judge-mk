// src/Signup.js
import React from 'react';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <div className="p-6 mx-auto bg-white rounded-md shadow-lg md:w-96">
        <h2 className="mb-4 text-2xl font-semibold text-center">Signup</h2>
        <form>
          {/* Signup form fields */}
          <input className="input" type="text" placeholder="Username" />
          <input className="input" type="password" placeholder="Password" />
          <input className="input" type="password" placeholder="Confirm Password" />
          <button className="btn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
