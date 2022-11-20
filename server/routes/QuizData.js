const express = require('express');
const router = express.Router();
const http = require("https");

router.get("/", async (request, response) => {
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
        console.log(body);
        console.log(body.toString());
        response.send(body.toString());
    });
    });
    
    req.end();
})



module.exports = router;
