const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Ruta protegida para administradores" });
});

module.exports = router;
