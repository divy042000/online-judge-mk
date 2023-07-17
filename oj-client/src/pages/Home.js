import React from 'react';
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';


export default function Home(){
    const navigate = useNavigate();
    return(
        <>
        <Navbar />
        <div className="m-3 p-5 text-center">
            <h1 className="text-[4rem] font-bold text-gold">We Judge your CODE</h1>
            <h1 className="text-[5rem] font-bold text-gold">Like a PRO!</h1>
        </div>
        <div className="m-3 p-5 text-center">
            <button className="text-[2rem] font-bold text-gold p-3 hover:bg-gray-600 bg-gray-700 rounded" onClick={() => navigate('/problems')}>Solve Problems</button>
        </div>

   
        </>
    )
}