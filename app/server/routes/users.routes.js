const express = require('express');
const router = express.Router();
const usersInfo = require("../controllers/users.controller");

router.post("/", usersInfo.createUser);

router.get("/", usersInfo.findAllUsers);

module.exports = router;