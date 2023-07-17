const express = require('express');
const router = express.Router();
const {generateFile} = require('../utils/generateFile');
const {executeCpp} = require('../utils/executeCpp');

const ProblemsSchema = require("../models/ProblemsSchema");

router.post('/addprob', async (req, res) => {
    try {
        const {statement, name, code, difficulty} = req.body;

        const problem = new ProblemsSchema({
            statement, name, code, difficulty
        })
    
        await problem.save();
        return res.json({message: "problem added successfully"});
    } catch(err){
        return res.json({Error: err.message});
    }
})

router.get('/all', async(req, res) => {
    try {
        const problems = await ProblemsSchema.find();
        return res.json({message: problems});

    } catch(err){
        return res.json({Error: err});
    }
})

router.post('/get_prob_by_id', async(req, res) => {

    try {
        const _id = req.body;
        // console.log(id);
        const prob = await ProblemsSchema.find({_id});
        console.log(prob);

        if(prob){
            return res.json({message: prob});
        }
    } catch (err){
        return res.json({Error: err});
    }
})

router.post('/run', async (req, res) => {
    const { lang, code} = req.body;
    console.log(code);
    if(code === undefined){
        return res.json({message: "Empty code body"});
    }
    try {
        const filePath = await generateFile(lang, code);
    const output = await executeCpp(filePath);
    return res.json({filePath, output});

    } catch(err){
        return res.json({message: err.message})
    }
    
})



module.exports = router;