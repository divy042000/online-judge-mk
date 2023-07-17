const express = require('express');
const { default: mongoose } = require('mongoose');

const Problems = new mongoose.Schema(
    {
        statement:{
            type: String,
        },
        name:{
            type: String,
        },
        code:{
            type: String,
        },
        difficulty:{
            type: String,
            enum: ['Easy', 'Medium', 'Hard']
        },
        
    }
)

module.exports = mongoose.model("Problems", Problems);