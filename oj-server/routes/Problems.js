const express = require('express');
const router = express.Router();
const {generateFile} = require('../utils/generateFile');
const {executeCpp, executePython} = require('../utils/executeCpp');

const ProblemsSchema = require("../models/ProblemsSchema");
const SubmissionSchema = require("../models/SubmissionSchema");

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

router.post('/add-testcases', async(req, res) => {
    try {
        const {probid, input, expectedOutput} = req.body;
        console.log("yess")
        const problem = await ProblemsSchema.findById(probid);

        if(!problem){
            return res.json({message: "Problem not found"})
        }

        problem.testCases.push({input, expectedOutput});
        await problem.save();

        return res.json({message: problem})
    } catch(err){
        return res.json({message: err});
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

router.post('/submit', async(req, res) => {
    const { lang, code, probid, user_id} = req.body;
    console.log(code);
    const problem = await ProblemsSchema.findById(probid);
    if(code === undefined){
        return res.json({message: "Empty code body"});
    }

    try {
        const filePath = await generateFile(lang, code);
        console.log(filePath);
        var output;
        const results = [];
        for(const testcase of problem.testCases){
            const {input, expectedOutput} = testcase;
            try {
                if(lang == 'cpp'){
                    output = await executeCpp(filePath,input);
                }
                if(lang == 'python'){
                    output = await executePython(filePath, input);
                }
                const isCorrect = output.trim() === expectedOutput.trim();
                results.push({input, expectedOutput, output, isCorrect});

            } catch(err){
                console.log(err);
                results.push({input, expectedOutput, output: 'Error', isCorrect: false});
            }
            
        }

        const submission = new SubmissionSchema({
            user_id: user_id,
            problem_name: problem.name,
            verdict: results.every((res)=> res.isCorrect)
        })
        await submission.save();

        // console.log(results);
    
    return res.json({filePath, output, results});

    } catch(err){
        return res.json({message: err.message})
    }
})
router.post('/run', async (req, res) => {
    const { lang, code, user_input} = req.body;
    console.log(code);
    if(code === undefined){
        return res.json({message: "Empty code body"});
    }

    try {
        const filePath = await generateFile(lang, code);
        var output;
        if(lang == 'cpp'){
            output = await executeCpp(filePath,user_input);
        }
        if(lang == 'python'){
            output = await executePython(filePath, user_input);
        }
    
    return res.json({filePath, output});

    } catch(err){
        return res.json({message: err.message})
    }
    
})



module.exports = router;