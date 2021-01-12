const { Router } = require("express");
const router = Router();
const Card = require("../models/card");
const Product = require("../models/product");

router.post("/add", async (req, res) => {
  const product = await Product.getById(req.body.id);
  await Card.add(product);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Cart",
    isCard: true,
    products: card.products,
    price: card.price,
  });
});

module.exports = router;
