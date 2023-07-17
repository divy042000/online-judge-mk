const express = require('express');
const { default: mongoose } = require('mongoose');
const {problem} = require("./ProblemsSchema");

const Solutions = new mongoose.Schema(
    {
        verdict:{
            type: String,
        },
        submittedAt:{
            type: Date,
            default: Date.now
        }
        
    }
)

module.exports = mongoose.model("Solutions", Solutions);