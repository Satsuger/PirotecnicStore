const { Router } = require("express");
const Product = require("../models/product");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add Products page",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  const products = new Product(req.body.title, req.body.price, req.body.image);
  await products.save();

  res.redirect("/products");
});

module.exports = router;
