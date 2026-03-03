const express = require("express");
const router = express.Router();
const jardinController = require("../controllers/jardinController");

// Routes CRUD principales
router.get("/", jardinController.getAllJardins);
router.get("/:id", jardinController.getJardinById);
router.post("/", jardinController.createJardin);
router.put("/:id", jardinController.updateJardin);
router.delete("/:id", jardinController.deleteJardin);

// Routes de filtrage
router.get("/statut/:statut", jardinController.getJardinsByStatut);

module.exports = router;

