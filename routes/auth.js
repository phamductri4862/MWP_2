const express = require("express");
const router = express.Router();

const {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
} = require("../controllers/auth");
const {
  registerEmail: registerEmail,
  registerPassConfirmation,
  loginEmail,
  loginPassword,
} = require("../middleware/validators/auth");

router.get("/login", getLogin);
router.post("/login", loginEmail, loginPassword, postLogin);
router.get("/register", getRegister);
router.post("/register", registerEmail, registerPassConfirmation, postRegister);

module.exports = router;
