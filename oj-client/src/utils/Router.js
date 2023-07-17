import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import ProblemsList from "../pages/ProblemsList"
import Problem from '../pages/Problem';
import About from "../pages/About";

export default function Router(){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/problems" element={<ProblemsList />} />
            <Route exact path="/problems/:id" element={<Problem />} />
            <Route exact path="/about" element={<About />} />
        </Routes>
        </BrowserRouter>
        </>
    )
}