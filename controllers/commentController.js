const Comment = require("../models/comment");

// GET tous les commentaires
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.getAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET un commentaire par ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.getById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: "Commentaire non trouvé",
      });
    }

    res.json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET commentaires par suggestion
exports.getCommentsBySuggestion = async (req, res) => {
  try {
    const { suggestionId } = req.params;
    const comments = await Comment.findBySuggestionId(suggestionId);

    res.json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { suggestion_id, author, content, status } = req.body;

    if (!suggestion_id) {
      return res.status(400).json({
        success: false,
        error: "L'identifiant de la suggestion (suggestion_id) est requis",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "Le contenu du commentaire est requis",
      });
    }

    const insertId = await Comment.create({
      suggestion_id,
      author,
      content,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Commentaire créé avec succès",
      id: insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content, status } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "Le contenu du commentaire est requis",
      });
    }

    const affectedRows = await Comment.update(id, {
      author,
      content,
      status,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Commentaire non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Commentaire mis à jour avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Comment.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Commentaire non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Commentaire supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


