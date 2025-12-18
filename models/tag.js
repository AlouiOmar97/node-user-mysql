const { pool } = require("../config/database");

class Tag {
  // Récupérer tous les tags
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM tags ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un tag par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM tags WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Créer un nouveau tag
  static async create(data) {
    try {
      const { name, description, color, status } = data;
      const [result] = await pool.query(
        "INSERT INTO tags (name, description, color, status) VALUES (?, ?, ?, ?)",
        [name, description || "", color || null, status || "active"]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un tag
  static async update(id, data) {
    try {
      const { name, description, color, status } = data;
      const [result] = await pool.query(
        "UPDATE tags SET name = ?, description = ?, color = ?, status = ? WHERE id = ?",
        [name, description, color, status, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un tag
  static async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM tags WHERE id = ?", [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par statut
  static async findByStatus(status) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM tags WHERE status = ? ORDER BY created_at DESC",
        [status]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Tag;


