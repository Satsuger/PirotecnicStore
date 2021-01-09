const { Router } = require("express");
const Nigger = require("../models/nigger");
const router = Router();

router.get("/", async (req, res) => {
  const niggers = await Nigger.getAll();
  res.render("niggers", {
    title: "Niggers page",
    isDauns: true,
    niggers,
  });
});

router.get("/:id/edit", (req, res) => {
  if (!req.query.allow) return res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const nigger = await Nigger.getById(req.params.id);

  res.render("nigger", {
    layout: "empty",
    title: `Nigger ${nigger.name}`,
    nigger,
  });
});

module.exports = router;
