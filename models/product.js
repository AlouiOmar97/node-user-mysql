const { pool } = require("../config/database");

class Product {
  // Récupérer tous les produits
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM products ORDER BY id DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un produit par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Créer un nouveau produit
  static async create(data) {
    try {
      const { name, description, price, stock, category, imageUrl, available } = data;
      const [result] = await pool.query(
        `INSERT INTO products (name, description, price, stock, category, imageUrl, available)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          description || null,
          price,
          stock || 0,
          category || null,
          imageUrl || null,
          available !== undefined ? available : true,
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un produit
  static async update(id, data) {
    try {
      const { name, description, price, stock, category, imageUrl, available } = data;
      const [result] = await pool.query(
        `UPDATE products
         SET name = ?, description = ?, price = ?, stock = ?, category = ?, imageUrl = ?, available = ?
         WHERE id = ?`,
        [name, description, price, stock, category, imageUrl, available, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un produit
  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM products WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Filtrer par catégorie
  static async findByCategory(category) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM products WHERE category = ? ORDER BY id DESC",
        [category]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Filtrer par disponibilité
  static async findByAvailability(available) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM products WHERE available = ? ORDER BY id DESC",
        [available]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
