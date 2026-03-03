const { pool } = require("../config/database");

class Jardin {
  // Récupérer tous les jardins
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM jardins ORDER BY dateEntretien DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un jardin par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM jardins WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Créer un nouveau jardin
  static async create(data) {
    try {
      const { adresse, surface, dateEntretien, statut } = data;
      const [result] = await pool.query(
        "INSERT INTO jardins (adresse, surface, dateEntretien, statut) VALUES (?, ?, ?, ?)",
        [
          adresse,
          surface,
          dateEntretien || null,
          typeof statut === "boolean" ? (statut ? 1 : 0) : 1,
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un jardin
  static async update(id, data) {
    try {
      const { adresse, surface, dateEntretien, statut } = data;
      const [result] = await pool.query(
        "UPDATE jardins SET adresse = ?, surface = ?, dateEntretien = ?, statut = ? WHERE id = ?",
        [
          adresse,
          surface,
          dateEntretien || null,
          typeof statut === "boolean" ? (statut ? 1 : 0) : statut,
          id,
        ]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un jardin
  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM jardins WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par statut
  static async findByStatut(statut) {
    try {
      const normalizedStatut =
        statut === "true" || statut === "1" || statut === 1 ? 1 : 0;
      const [rows] = await pool.query(
        "SELECT * FROM jardins WHERE statut = ? ORDER BY dateEntretien DESC",
        [normalizedStatut]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Jardin;

