const express = require('express');
const { default: mongoose } = require('mongoose');

const Submissions = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        problem_name: {
            type: String
        },
        submission_time: {
            type: Date,
            default: Date.now()
        },
        verdict: {
            type: String
        }
      
        
    }
)

module.exports = mongoose.model("Submissions", Submissions);