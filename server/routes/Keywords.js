const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    const MonkeyLearn = require('monkeylearn')

    const ml = new MonkeyLearn('484b02e0fc16ee4eec78289b9ec2f8b97792bafa')
    let model_id = 'ex_MKMcW3w9'
    let data = [req.body.text]
    await ml.extractors.extract(model_id, data)
    .then(response => {
        res.send(response.body);
    })
})

module.exports = router;