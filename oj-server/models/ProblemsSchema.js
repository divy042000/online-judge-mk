const express = require('express');
const { default: mongoose } = require('mongoose');


const TestCasesSchema = new mongoose.Schema(
    {
        input:{
            type: String,
        },
        expectedOutput:{
            type: String,
        }
        
    }
)

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
        testCases: [TestCasesSchema]
        
    }
)

module.exports = mongoose.model("Problems", Problems);