const Product = require("../models/product");

// GET tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: "Produit non trouvé" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl, available } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: "Le nom est requis" });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({ success: false, error: "Le prix est requis" });
    }

    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ success: false, error: "Le prix doit être un nombre positif" });
    }

    if (stock !== undefined && (isNaN(stock) || Number(stock) < 0)) {
      return res.status(400).json({ success: false, error: "Le stock doit être un nombre positif" });
    }

    const insertId = await Product.create({ name, description, price, stock, category, imageUrl, available });

    res.status(201).json({
      success: true,
      message: "Produit créé avec succès",
      id: insertId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl, available } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: "Le nom est requis" });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({ success: false, error: "Le prix est requis" });
    }

    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ success: false, error: "Le prix doit être un nombre positif" });
    }

    if (stock !== undefined && (isNaN(stock) || Number(stock) < 0)) {
      return res.status(400).json({ success: false, error: "Le stock doit être un nombre positif" });
    }

    const affectedRows = await Product.update(id, { name, description, price, stock, category, imageUrl, available });

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Produit non trouvé" });
    }

    res.json({ success: true, message: "Produit mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Product.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Produit non trouvé" });
    }

    res.json({ success: true, message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET produits par catégorie
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.findByCategory(category);

    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET produits par disponibilité
exports.getProductsByAvailability = async (req, res) => {
  try {
    const { available } = req.params;
    // Accept "true"/"1" as true, anything else as false
    const availableBool = available === "true" || available === "1";
    const products = await Product.findByAvailability(availableBool);

    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
