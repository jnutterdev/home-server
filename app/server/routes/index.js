const express = require('express');
const router = express.Router();
const index = require("../controllers/index.js");

router.get("/", index.onLoad);

module.exports = router;