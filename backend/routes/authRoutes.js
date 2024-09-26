const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// ユーザー登録ルート
router.post("/register", registerUser);

// ユーザーログインルート
router.post("/login", loginUser);

module.exports = router;
