const express = require("express");
const { store, getById, getAll, update, deleteApplication } = require("../controllers/application.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authenticate, store);
router.put("/:id", authenticate, authorize(["admin"]), update);
router.get("/:id", authenticate, authorize(["admin"]), getById);
router.get("/", getAll);
router.delete("/:id", authenticate, authorize(["admin"]), deleteApplication);
module.exports = router;
