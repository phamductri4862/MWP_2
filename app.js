const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const getAnswersRoute = require("./routes/getAnswers");
const fakeWebRoute = require("./routes/fakeWeb.js");

const PORT = process.env.PORT || 3000;

const store = new MongoDBStore({
  uri: "mongodb+srv://phamductri4862:4862@devltt404.wt9ehvc.mongodb.net/test",
  collection: "sessions",
});

app.use(
  session({
    secret: "mySecretSession",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(indexRoute);
app.use(authRoute);
app.use(getAnswersRoute);
app.use(fakeWebRoute);

app.use((res, req) => {
  req.send("Page not found");
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://phamductri4862:4862@devltt404.wt9ehvc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => console.log("Connect to database."))
  .catch((err) => {
    throw new Error(err);
  });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
