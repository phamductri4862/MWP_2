const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const saltRounds = 10;

module.exports = {
  getLogin(req, res) {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
    });
  },

  async postLogin(req, res) {
    try {
      const validErrors = validationResult(req);
      if (validErrors.isEmpty()) {
        const { email, password } = req.body;
        await req.session.save();
        return res.redirect("/");
        res.redirect("/");
      } else {
        console.log(validErrors);
        res.render("auth/login", {
          path: "/login",
          pageTitle: "Login",
        });
      }
    } catch (error) {
      res.render("error", { error });
    }
  },

  getRegister(req, res) {
    res.render("auth/register", {
      path: "/register",
      pageTitle: "Register",
    });
  },

  async postRegister(req, res) {
    try {
      const validErrors = validationResult(req);
      if (validErrors.isEmpty()) {
        const { email, password } = req.body;
        const hasedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ email, password: hasedPassword });
        await user.save();
        req.session.user = user;
        await req.session.save();
        return res.redirect("/");
      } else {
        console.log(validErrors);
        return res.render("auth/register", {
          path: "/register",
          pageTitle: "Register",
        });
      }
    } catch (error) {
      res.render("error", { error });
    }
  },
};
