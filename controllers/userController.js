const User = require("../models/user");

// GET tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.getById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom est requis",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "L'email est requis",
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Cet email est déjà utilisé",
      });
    }

    const insertId = await User.create({
      name,
      email,
      role,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      id: insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom est requis",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "L'email est requis",
      });
    }

    // Vérifier si l'email existe déjà pour un autre utilisateur
    const existingUser = await User.findByEmail(email);
    if (existingUser && existingUser.id !== parseInt(id)) {
      return res.status(400).json({
        success: false,
        error: "Cet email est déjà utilisé par un autre utilisateur",
      });
    }

    const affectedRows = await User.update(id, {
      name,
      email,
      role,
      status,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Utilisateur mis à jour avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await User.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET utilisateurs par rôle
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.findByRole(role);

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET utilisateurs par statut
exports.getUsersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const users = await User.findByStatus(status);

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

