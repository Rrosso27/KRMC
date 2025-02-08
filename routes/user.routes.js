const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {getAll,getByEmail} = require("../controllers/user.controller")
const router = express.Router();


router.get("/", getAll);
router.get("/:email",getByEmail )
// router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
//   res.json({ message: "Ruta protegida para administradores" });
// });

module.exports = router;