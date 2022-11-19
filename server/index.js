const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // specifies that all incoming data is json format

