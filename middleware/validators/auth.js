const { check } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  registerEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid.")
    .custom(async (email) => {
      if (await User.findOne({ email })) {
        throw new Error("Email is registered");
      }
      return true;
    }),

  registerPassConfirmation: check("passwordConfirmation").custom(
    (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Password confirmation must match!");
      }
      return true;
    }
  ),

  loginEmail: check("email").custom((email) => {
    if (User.findOne({ email })) {
      return true;
    }
    throw new Error("Email is not registered");
  }),

  loginPassword: check("password").custom(async (password, { req }) => {
    const user = await User.findOne({ email: req.body.email });
    if (await bcrypt.compare(password, user.password)) {
      return true;
    }
    throw new Error("Password is wrong.");
  }),
};
