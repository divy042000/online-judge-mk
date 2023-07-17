import React from 'react';
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';


export default function About(){
    const navigate = useNavigate();
    return(
        <>
        <Navbar />
        <div className="m-3 p-5 text-center">
            <h1 className="text-[4rem] font-bold text-gold">Coming Soon...</h1>
        </div>
       

   
        </>
    )
}