const { Router } = require("express");
const Nigger = require("../models/nigger");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add Nigger page",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  const nigger = new Nigger(req.body.name, req.body.price, req.body.image);
  await nigger.save();

  res.redirect("/niggers");
});

module.exports = router;
