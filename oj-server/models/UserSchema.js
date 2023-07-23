const express = require('express');
const { default: mongoose } = require('mongoose');

const User = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            unique: true,
        },
        user_email: {
            type: String,
            required: true,
            unique: true,
        },
        user_password: {
            type: String,
            required: true
        }
      
        
    }
)

module.exports = mongoose.model("Users", User);