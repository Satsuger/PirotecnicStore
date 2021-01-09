const exphbs = require("express-handlebars");
const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");
const homeRouter = require("./routes/home");
const addRouter = require("./routes/add");
const { urlencoded } = require("express");

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
app.use(urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/products", productsRouter);
app.use("/add", addRouter);

// Listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
