const exphbs = require("express-handlebars");
const path = require("path");
const express = require("express");
const { urlencoded } = require("express");
const addRouter = require("./routes/add");
const homeRouter = require("./routes/home");
const cardRouter = require("./routes/card");
const productsRouter = require("./routes/products");
const { dirname } = require("path");

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/add", addRouter);
app.use("/card", cardRouter);
app.use("/products", productsRouter);

// Listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
