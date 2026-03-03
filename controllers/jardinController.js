const Jardin = require("../models/jardin");

// GET tous les jardins
exports.getAllJardins = async (req, res) => {
  try {
    const jardins = await Jardin.getAll();
    res.json(jardins);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET un jardin par ID
exports.getJardinById = async (req, res) => {
  try {
    const { id } = req.params;
    const jardin = await Jardin.getById(id);

    if (!jardin) {
      return res.status(404).json({
        success: false,
        error: "Jardin non trouvé",
      });
    }

    res.json({
      success: true,
      jardin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST créer un jardin
exports.createJardin = async (req, res) => {
  try {
    const { adresse, surface, dateEntretien, statut } = req.body;

    if (!adresse) {
      return res.status(400).json({
        success: false,
        error: "L'adresse est requise",
      });
    }

    if (surface === undefined || surface === null || isNaN(surface)) {
      return res.status(400).json({
        success: false,
        error: "La surface numérique est requise",
      });
    }

    const insertId = await Jardin.create({
      adresse,
      surface,
      dateEntretien,
      statut,
    });

    res.status(201).json({
      success: true,
      message: "Jardin créé avec succès",
      id: insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT mettre à jour un jardin
exports.updateJardin = async (req, res) => {
  try {
    const { id } = req.params;
    const { adresse, surface, dateEntretien, statut } = req.body;

    if (!adresse) {
      return res.status(400).json({
        success: false,
        error: "L'adresse est requise",
      });
    }

    if (surface === undefined || surface === null || isNaN(surface)) {
      return res.status(400).json({
        success: false,
        error: "La surface numérique est requise",
      });
    }

    const affectedRows = await Jardin.update(id, {
      adresse,
      surface,
      dateEntretien,
      statut,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Jardin non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Jardin mis à jour avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE supprimer un jardin
exports.deleteJardin = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Jardin.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Jardin non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Jardin supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET jardins par statut
exports.getJardinsByStatut = async (req, res) => {
  try {
    const { statut } = req.params;
    const jardins = await Jardin.findByStatut(statut);

    res.json({
      success: true,
      count: jardins.length,
      jardins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

