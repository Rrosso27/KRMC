const express = require("express");
const { store, getById, getAll, update, deleteEmployee } = require("../controllers/employees.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/", authenticate, authorize(["admin"]), store);
router.put("/:id", authenticate, authorize(["admin"]), update);
router.get("/:id", authenticate, authorize(["admin"]), getById);
router.get("/", getAll);
router.delete("/:id", authenticate, authorize(["admin"]), deleteEmployee);

// router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
//   res.json({ message: "Ruta protegida para administradores" });
// });

module.exports = router;
