// src/Login.js
import React from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center py-12 ">
      <div className="p-6 mx-auto rounded-md blue-shadow md:w-96">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gold">Login</h2>
        <form>
          {/* Login form fields */}
          <input className="input" type="text" placeholder="Username" />
          <input className="input" type="password" placeholder="Password" />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default Login;
