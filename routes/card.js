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
  const card = Card.fetch();
  res.render("card", {
    title: "Cart",
    isCard: true,
    products: card.product,
    price: card.price,
  });
});

module.exports = router;
