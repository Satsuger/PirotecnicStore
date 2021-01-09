const { Router } = require("express");
const Product = require("../models/product");
const router = Router();

router.get("/", async (req, res) => {
  const products = await Products.getAll();
  res.render("products", {
    title: "Products page",
    isProducts: true,
    products,
  });
});

router.get("/:id/edit", (req, res) => {
  if (!req.query.allow) return res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const product = await Product.getById(req.params.id);

  res.render("product", {
    layout: "empty",
    title: `Product ${product.name}`,
    product,
  });
});

module.exports = router;
