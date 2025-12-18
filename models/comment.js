const { pool } = require("../config/database");

class Comment {
  // Récupérer tous les commentaires
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM comments ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un commentaire par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM comments WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Récupérer les commentaires d'une suggestion
  static async findBySuggestionId(suggestionId) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM comments WHERE suggestion_id = ? ORDER BY created_at DESC",
        [suggestionId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Créer un nouveau commentaire
  static async create(data) {
    try {
      const { suggestion_id, author, content, status } = data;
      const [result] = await pool.query(
        "INSERT INTO comments (suggestion_id, author, content, status) VALUES (?, ?, ?, ?)",
        [suggestion_id, author || null, content, status || "visible"]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un commentaire
  static async update(id, data) {
    try {
      const { author, content, status } = data;
      const [result] = await pool.query(
        "UPDATE comments SET author = ?, content = ?, status = ? WHERE id = ?",
        [author, content, status, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un commentaire
  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM comments WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Comment;


