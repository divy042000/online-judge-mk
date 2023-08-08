// src/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/signup.css"
import { register_user, login_user, auth_user } from "../controllers/UserRoutes";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();

    let obj = {
      user_name: name,
      user_email: email,
      user_password: password,
    };
    register_user(obj).then((data) => {
      alert(data.message);
      console.log(data);
    });

    setEmail("");
    setName("");
    setPassword("");
  };

  const login_handleChange = async (e) => {
    e.preventDefault();
    let obj = {
      user_email: email,
      user_password: password,
    };
      login_user(obj).then((data) => {
        if (data.tag === true) {
          localStorage.setItem("user_token", data.token);
          navigate("/");
        } else {
          alert("Invalid login");
        }
        window.location.reload();
      });
    }
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-cover bg-center flex justify-center items-center px-4 bg-gray-700">
        <div className="main z-1 mt-32">
          <input
            className="input"
            type="checkbox"
            id="chk"
            aria-hidden="true"
          />

          <div className="signup">
            <form method="POST">
              <label className="label text-gold" for="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                className="input bg-[#FFD700]"
                type="text"
                name="txt"
                placeholder="User name"
                required=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                className="input bg-[#FFD700]"
                type="email"
                name="email"
                placeholder="Email"
                required=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

             

              <input
                className="input bg-[#FFD700]"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="signup-btn bg-[#FFD700] text-gray-700 hover:bg-[#fff1a4]"
                value="Register"
                onClick={handleChange}
              >
                Sign up
              </button>
            </form>
          </div>

          <div className="login bg-[#FFD700]">
            <form>
              <label className="label text-gray-700" for="chk" aria-hidden="true">
                Login
              </label>
              <input
                className="input bg-gray-700 text-gold"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required=""
              />
              <input
                className="input bg-gray-700 text-gold"
                type="password"
                name="pswd"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
              <button className="signup-btn bg-gray-700 hover:bg-gray-600 text-gold" onClick={login_handleChange}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default SignUp;
