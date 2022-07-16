const express = require('express');
const router = express.Router();
const usersInfo = require("../controllers/users.controller");

router.post("/", usersInfo.createUser);

router.get("/", usersInfo.findAllUsers);

router.get("/active", usersInfo.findAllActiveUsers);

router.get("/:id", usersInfo.findUser);

router.put("/:id", usersInfo.updateUser);

router.delete("/:id", usersInfo.deleteUser);

router.delete("/", usersInfo.deleteAllUsers);

module.exports = router;