const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json()); // specifies that all incoming data is json format
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}));

// routers
const quizRouter = require('./routes/QuizData');
app.use("/getQuizData", quizRouter);
const keywordRouter = require('./routes/Keywords');
app.use("/getKeywords", keywordRouter);
const youtubeRouter = require('./routes/youtube');
app.use("/getYTLinks", youtubeRouter);

app.listen(3001, () => {
    console.log("server running on port 3001");
})