const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");

// ユーザーを作成するルート
router.post("/", createUser);

// 全てのユーザーを取得するルート
router.get("/", getUsers);

module.exports = router;
