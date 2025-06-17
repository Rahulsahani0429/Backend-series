const { body } = require("express-validator");
const loginRule = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Provide a valid email"),

  body("password").trim().notEmpty().withMessage("Password is required"),
];

module.exports = loginRule;
