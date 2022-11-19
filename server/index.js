const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json()); // specifies that all incoming data is json format

const http = require("https");


app.get("/getQuizData", async (request, response) => {
    const url = "https://quizlet.com/ca/639971093/dsci100-quiz-2-flash-cards/"
    const options = {
        "method": "GET",
        "hostname": "api.webscrapingapi.com",
        "port": null,
        "path":  `/v1?url=${url}%2F&api_key=A2fwN9zTxMhBXbwa2BSaEQbazFjcPHbq&render_js=0&device=desktop&proxy_type=datacenter&extract_rules=%7B%22selector%22%3A%22.TermText%22%2C%20%22output%22%3A%22text%22%7D`,
        "headers": {}
    };
    
    const req = http.request(options, function (res) {
    const chunks = [];
    let result = "";
    
    res.on("data", function (chunk) {
        chunks.push(chunk);
    });
    
    res.on("end", function () {
        const body = Buffer.concat(chunks);
        response.send(body.toString());
    });
    });
    
    req.end();
})

app.listen(3001, () => {
    console.log("server running on port 3001");
})