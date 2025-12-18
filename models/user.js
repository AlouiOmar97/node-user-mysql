const { pool } = require("../config/database");

class User {
  // Récupérer tous les utilisateurs
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un utilisateur par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Créer un nouvel utilisateur
  static async create(data) {
    try {
      const { name, email, role, status } = data;
      const [result] = await pool.query(
        "INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)",
        [name, email, role || "user", status || "active"]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un utilisateur
  static async update(id, data) {
    try {
      const { name, email, role, status } = data;
      const [result] = await pool.query(
        "UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?",
        [name, email, role, status, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un utilisateur
  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM users WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par rôle
  static async findByRole(role) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE role = ? ORDER BY created_at DESC",
        [role]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par statut
  static async findByStatus(status) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE status = ? ORDER BY created_at DESC",
        [status]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;

