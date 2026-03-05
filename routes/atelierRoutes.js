const express = require("express");
const router = express.Router();
const atelierController = require("../controllers/atelierController");

// Routes CRUD principales
router.get("/", atelierController.getAllAteliers);
router.get("/:id", atelierController.getAtelierById);
router.post("/", atelierController.createAtelier);
router.put("/:id", atelierController.updateAtelier);
router.delete("/:id", atelierController.deleteAtelier);

// Routes de filtrage
router.get("/statut/:statut", atelierController.getAteliersByStatut);

module.exports = router;

