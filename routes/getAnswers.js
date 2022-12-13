const express = require("express");
const router = express.Router();

const {
  getAnswers,
  postAnswers,
  getAnswersWithId,
} = require("../controllers/getAnswers");

router.get("/get-answers", getAnswers);
router.post("/get-answers", postAnswers);
router.get("/get-answers/:id", getAnswersWithId);

module.exports = router;
