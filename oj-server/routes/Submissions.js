const express = require('express');
const SubmissionSchema = require('../models/SubmissionSchema');
const router = express.Router();

router.get('/all', async(req, res) => {
    try {
        const submissions = await SubmissionSchema.find().sort({ submission_time: -1 });
        return res.json({message: submissions})
    } catch(err){
        return res.json({Error: err});
    }
})

module.exports = router;