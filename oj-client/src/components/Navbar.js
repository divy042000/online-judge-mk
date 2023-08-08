import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="w-full bg-gray-900 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-9xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items- justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <h1 className="mb-4 flex items-center justify-center font-semibold md:justify-start text-5xl text-gold font-lilita">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gold"
                    class="mr-3 h-10 w-10"
                  >
                    <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                  </svg>
                  Pro.Judge
                </h1>
              </Link>

              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-2xl">
                <li className="text-gold hover:text-indigo-200 font-medium">
                  <Link to="/problems">Problems</Link>
                </li>
                <li className="text-gold hover:text-indigo-200 font-medium">
                  <Link to="/submissions">Submissions</Link>
                </li>

                
                {localStorage.getItem("user_token") ? <>
                <li>
                    <button className="text-gold hover:text-indigo-200 font-medium" onClick={() => {
                        localStorage.removeItem("user_token");
                        window.location.reload();
                    }}>
                        Logout
                    </button>
                </li>
                </> : <>
                <li className="text-gold hover:text-indigo-200 font-medium">
                  <Link to="/signup">Login/Signup</Link>
                </li></>}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
