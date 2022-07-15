const express = require('express');
const router = express.Router();
const usersInfo = require("../controllers/users.controller");

router.get("/", usersInfo.onLoad);

module.exports = router;