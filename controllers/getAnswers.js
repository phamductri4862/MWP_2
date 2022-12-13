const got = require("got");
const Qas = require("../models/Qas");

module.exports = {
  getAnswers(req, res) {
    res.render("getAnswers", {
      path: "/get-answers",
      pageTitle: "Get Answers",
      result: null,
    });
  },

  async postAnswers(req, res) {
    try {
      let input;
      const inputStr = req.body.input;
      if (inputStr.slice(0, 4) === "http") {
        let { body: result } = await got(inputStr);
        result = result.replace(/(\r\n|\n|\r)/gm, "");
        result = result.replace(/\s/g, "");
        const startSplit = result.indexOf(`data="`) + 6;
        result = result.slice(startSplit, result.indexOf(`";`, startSplit));
        input = Buffer.from(result, "base64").toString("utf-8");
      } else {
        input = Buffer.from(req.body.input, "base64").toString("utf-8");
      }

      let alpha = ["A", "B", "C", "D"];
      const splitMul = input.split(`"tp":"MultipleChoice","D":{"h":"`);
      const result = new Array(splitMul.length - 1);
      for (let i = 1; i < splitMul.length; i++) {
        const resultIndex = i - 1;
        result[resultIndex] = { question: "", answers: [], correct: 0 };
        let from = 0;
        from = splitMul[i].indexOf('["', from) + 2;
        let temp = `${splitMul[i].slice(
          from,
          splitMul[i].indexOf('"]', from)
        )}`.slice(0, 500);

        result[resultIndex].question = temp;

        for (let j = 0; j < 4; j++) {
          from = splitMul[i].indexOf('["', from) + 2;
          let ans = alpha[j] + ". ";
          ans += splitMul[i].slice(from, splitMul[i].indexOf('"]', from));
          from = splitMul[i].indexOf('"c":', from) + 1;
          from = splitMul[i].indexOf('"c":', from) + 4;
          if (splitMul[i][from] == "t") result[resultIndex].correct = j;
          result[resultIndex].answers[j] = ans.slice(0, 500);
        }
      }
      result.sort(function compareFn(a, b) {
        return a.question.localeCompare(b.question);
      });
      const qas = new Qas({ content: result });
      await qas.save();
      return res.redirect(`/get-answers/${qas._id}`);
    } catch (error) {
      res.render("error", { error });
    }
  },

  async getAnswersWithId(req, res) {
    try {
      const { id } = req.params;
      const qas = await Qas.findOne({ _id: id });
      if (qas) {
        return res.render("getAnswers", {
          path: "/get-answers",
          pageTitle: "Get Answers",
          result: qas.content,
        });
      } else {
        throw new Error("The id is not valid.");
      }
    } catch (error) {
      res.render("error", { error });
    }
  },
};
