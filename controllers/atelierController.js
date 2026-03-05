const Atelier = require("../models/atelier");

// GET tous les ateliers
exports.getAllAteliers = async (req, res) => {
  try {
    const ateliers = await Atelier.getAll();
    res.json(ateliers);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET un atelier par ID
exports.getAtelierById = async (req, res) => {
  try {
    const { id } = req.params;
    const atelier = await Atelier.getById(id);

    if (!atelier) {
      return res.status(404).json({
        success: false,
        error: "Atelier non trouvé",
      });
    }

    res.json({
      success: true,
      atelier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST créer un atelier
exports.createAtelier = async (req, res) => {
  try {
    const { nom, emailFormateur, nbrParticipant, statut } = req.body;

    if (!nom) {
      return res.status(400).json({
        success: false,
        error: "Le nom est requis",
      });
    }

    if (
      nbrParticipant === undefined ||
      nbrParticipant === null ||
      isNaN(nbrParticipant)
    ) {
      return res.status(400).json({
        success: false,
        error: "Le nombre de participants numérique est requis",
      });
    }

    const insertId = await Atelier.create({
      nom,
      emailFormateur,
      nbrParticipant,
      statut,
    });

    res.status(201).json({
      success: true,
      message: "Atelier créé avec succès",
      id: insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT mettre à jour un atelier
exports.updateAtelier = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, emailFormateur, nbrParticipant, statut } = req.body;

    if (!nom) {
      return res.status(400).json({
        success: false,
        error: "Le nom est requis",
      });
    }

    if (
      nbrParticipant === undefined ||
      nbrParticipant === null ||
      isNaN(nbrParticipant)
    ) {
      return res.status(400).json({
        success: false,
        error: "Le nombre de participants numérique est requis",
      });
    }

    const affectedRows = await Atelier.update(id, {
      nom,
      emailFormateur,
      nbrParticipant,
      statut,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Atelier non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Atelier mis à jour avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE supprimer un atelier
exports.deleteAtelier = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Atelier.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Atelier non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Atelier supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET ateliers par statut
exports.getAteliersByStatut = async (req, res) => {
  try {
    const { statut } = req.params;
    const ateliers = await Atelier.findByStatut(statut);

    res.json({
      success: true,
      count: ateliers.length,
      ateliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

