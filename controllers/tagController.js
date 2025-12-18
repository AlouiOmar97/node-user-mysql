const Tag = require("../models/tag");

// GET tous les tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.getAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET un tag par ID
exports.getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.getById(id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        error: "Tag non trouvé",
      });
    }

    res.json({
      success: true,
      tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST créer un tag
exports.createTag = async (req, res) => {
  try {
    const { name, description, color, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom du tag est requis",
      });
    }

    const insertId = await Tag.create({
      name,
      description,
      color,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Tag créé avec succès",
      id: insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT mettre à jour un tag
exports.updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, color, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom du tag est requis",
      });
    }

    const affectedRows = await Tag.update(id, {
      name,
      description,
      color,
      status,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Tag non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Tag mis à jour avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE supprimer un tag
exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Tag.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Tag non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Tag supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET tags par statut
exports.getTagsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tags = await Tag.findByStatus(status);

    res.json({
      success: true,
      count: tags.length,
      tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


