const { pool } = require("../config/database");

class Atelier {
  // Récupérer tous les ateliers
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM ateliers ORDER BY nom ASC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un atelier par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM ateliers WHERE id = ?", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Créer un nouvel atelier
  static async create(data) {
    try {
      const { nom, emailFormateur, nbrParticipant, statut } = data;
      const [result] = await pool.query(
        "INSERT INTO ateliers (nom, emailFormateur, nbrParticipant, statut) VALUES (?, ?, ?, ?)",
        [
          nom,
          emailFormateur || null,
          nbrParticipant,
          typeof statut === "boolean" ? (statut ? 1 : 0) : 1,
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un atelier
  static async update(id, data) {
    try {
      const { nom, emailFormateur, nbrParticipant, statut } = data;
      const [result] = await pool.query(
        "UPDATE ateliers SET nom = ?, emailFormateur = ?, nbrParticipant = ?, statut = ? WHERE id = ?",
        [
          nom,
          emailFormateur || null,
          nbrParticipant,
          typeof statut === "boolean" ? (statut ? 1 : 0) : statut,
          id,
        ]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un atelier
  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM ateliers WHERE id = ?",
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
        "SELECT * FROM ateliers WHERE statut = ? ORDER BY nom ASC",
        [normalizedStatut]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Atelier;

