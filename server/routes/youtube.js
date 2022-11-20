const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

router.post("/", async (req, res) => {
    google.youtube('v3').search.list({
        key: "AIzaSyClWMLMCQwYaLsKizhC049Z0CF8FSwO6KA",
        part: "snippet",
        maxResults: "1",
        q: `What is ${req.body.text}`
    }).then((response) => {
        res.send(`${response.data.items[0].id.videoId}`);
    }).catch(err => console.log(err));
})

module.exports = router;

