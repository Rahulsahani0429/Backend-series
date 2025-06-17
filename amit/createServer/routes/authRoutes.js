const express = require("express");
const AuthController = require("../controller/AuthController");
const registerRule = require("../middleware/rules/auth.rule");
const loginRule = require("../middleware/rules/login.rule");
const router = express.Router();

router.post("/login", loginRule, AuthController.login);
router.post("/register", registerRule, AuthController.register);

module.exports = router;
