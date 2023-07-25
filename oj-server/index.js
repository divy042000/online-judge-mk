const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv');
dotenv.config();

const problemRoutes = require("./routes/Problems");
const submissionRoutes = require("./routes/Submissions");
const userRoutes = require("./routes/Users");

try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
} catch(err){
    console.log(err);
}

const frontendURL = 'http://localhost:3000'; // Replace with your actual frontend URL
app.use(cors({
  origin: frontendURL,
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/problems', problemRoutes);
app.use('/submissions', submissionRoutes);
app.use('/user', userRoutes);

app.listen(PORT, ()=> {
    console.log("Listening on port " + `${PORT}`)
})