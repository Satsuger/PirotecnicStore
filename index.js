const exphbs = require("express-handlebars");
const express = require("express");
const path = require("path");
const { ppid } = require("process");

// Configure
const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// Middlevares
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: 'Home page',
    isHome: true
  });
});

app.get("/add", (req, res) => {
  res.render("add", {
    title: 'Add daun page',
    isAdd: true
  });
});

app.get("/dauns", (req, res) => {
  res.render("dauns", {
    title: 'Dauns page',
    isDauns: true
  });
});

// Listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
