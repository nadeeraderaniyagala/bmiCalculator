const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.set("view engine", "pug");

app.listen(4000, () => {
  console.log("server started on port 4000");
});

app.get("/", (req, res) => {
  res.render("bmi");
});

app.post("/", (req, res) => {
  console.log(req.body);

  let age = req.body.age;
  let weight = req.body.weight;
  let height = req.body.height;

  // need to use age too
  let bmi = weight / ((height / 100) ^ 2);
  res.render("bmi", { result: "Your BMI result is : " + bmi });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.render("error", { error: err });
});
