const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const mainRouter = require("./routes/mainRouter");
const searchRouter = require("./routes/searchRouter");

app.use("/", mainRouter);
app.use("/search", searchRouter);

app.use((req, res) => {
  res.status(404).render("errorPage", {
    title: "مقارن | خطأ 404",
    status: 404,
    message: "الصفحة غير موجودة",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render("errorPage", {
    title: `مقارن | خطأ 500`,
    status: 500,
    message: "خطأ داخلي في الخادم",
  });
});

app.listen(port, () => {
  console.log(`Muqaren is running on port ${port}`);
});
