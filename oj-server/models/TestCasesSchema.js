const express = require('express');
const { default: mongoose } = require('mongoose');

const Solutions = new mongoose.Schema(
    {
        input:{
            type: String,
        },
        output:{
            type: String,
        }
        
    }
)

module.exports = mongoose.model("Testcases", Solutions);