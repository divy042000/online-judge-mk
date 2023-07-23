import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import ProblemsList from "../pages/ProblemsList"
import Problem from '../pages/Problem';
import About from "../pages/About";
import Signup from '../pages/Signup';
import Submissions from '../pages/Submissions';

export default function Router(){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/problems" element={<ProblemsList />} />
            <Route exact path="/submissions" element={<Submissions />} />
            <Route exact path="/problems/:id" element={<Problem />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<Signup />} />
        </Routes>
        </BrowserRouter>
        </>
    )
}