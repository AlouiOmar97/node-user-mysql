const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Routes CRUD principales
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Routes de filtrage
router.get("/category/:category", productController.getProductsByCategory);
router.get("/available/:available", productController.getProductsByAvailability);

module.exports = router;
