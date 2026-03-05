# API

API REST construite avec Express.js, MySQL et architecture MVC pour gérer des suggestions, des utilisateurs, des commentaires, des tags, des jardins et des ateliers.

## 📋 Table des matières

- [Configuration de la base de données](#configuration-de-la-base-de-données)
- [Base de données](#base-de-données)
- [Cloner le projet](#cloner-le-projet)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [API Endpoints](#api-endpoints)
  - [Suggestions](#suggestions)
  - [Utilisateurs](#utilisateurs)
  - [Commentaires](#commentaires)
  - [Tags](#tags)
  - [Jardins](#jardins)
  - [Ateliers](#ateliers)
- [Exemples de requêtes](#exemples-de-requêtes)
- [Gestion des erreurs](#gestion-des-erreurs)


## ⚙️ Configuration de la base de données

- **1. Démarrer MySQL avec XAMPP ou WAMP**  
  - Ouvrez **XAMPP** ou **WAMP**  
  - Démarrez **Apache**  
  - Démarrez **MySQL**

- **2. Créer la base de données avec phpMyAdmin**  
  - Ouvrez **phpMyAdmin** (`http://localhost/phpmyadmin`)  
  - Cliquez sur **Nouvelle base de données**  
  - Créez une base de données nommée : **`suggestions_db`**  
  - Aucune table n'est nécessaire : elles seront créées **automatiquement** au démarrage du projet.

## 🗄️ Base de données

### Création de la base de données

Si vous avez suivi la section **Configuration de la base de données**, la base `suggestions_db` existe déjà.
Les **tables seront créées automatiquement** au premier démarrage de l'application grâce aux modèles Sequelize/MySQL.

> Optionnel : vous pouvez également importer manuellement le fichier `database.sql` via phpMyAdmin ou la ligne de commande MySQL si vous souhaitez pré-remplir la base.

### Structure des tables

#### Table `suggestions`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `title` (VARCHAR(255), NOT NULL)
- `description` (TEXT)
- `category` (VARCHAR(100))
- `date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `status` (VARCHAR(50), DEFAULT 'en attente')
- `nbLikes` (INT, DEFAULT 0)

#### Table `users`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), NOT NULL, UNIQUE)
- `role` (VARCHAR(50), DEFAULT 'user')
- `status` (VARCHAR(50), DEFAULT 'active')
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

#### Table `comments`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `suggestion_id` (INT, NOT NULL, FOREIGN KEY vers `suggestions.id`)
- `author` (VARCHAR(255), NULL)
- `content` (TEXT, NOT NULL)
- `status` (VARCHAR(50), DEFAULT 'visible')
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

#### Table `tags`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(100), NOT NULL)
- `description` (TEXT)
- `color` (VARCHAR(20))
- `status` (VARCHAR(50), DEFAULT 'active')
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

#### Table `jardins`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `adresse` (VARCHAR(255), NOT NULL)
- `surface` (DECIMAL(10,2), NOT NULL)
- `dateEntretien` (DATE, NULL)
- `statut` (TINYINT(1), DEFAULT 1) — 1 = actif, 0 = inactif

#### Table `ateliers`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nom` (VARCHAR(255), NOT NULL)
- `emailFormateur` (VARCHAR(255), NULL)
- `nbrParticipant` (INT, NOT NULL)
- `statut` (TINYINT(1), DEFAULT 1) — 1 = actif, 0 = inactif


## 📦 Cloner le projet

```bash
git clone https://github.com/AlouiOmar97/node-user-mysql.git
cd node-user-mysql
```


## 🚀 Installation

```bash
# Installer les dépendances
npm install
```
## ▶️ Démarrage

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`




## 📡 API Endpoints

### Suggestions

#### GET `/suggestions`
Récupère toutes les suggestions.

**Réponse :**
```json
[
  {
    "id": 1,
    "title": "Nouvelle fonctionnalité",
    "description": "Description de la suggestion",
    "category": "feature",
    "date": "2024-01-15T10:30:00.000Z",
    "status": "en attente",
    "nbLikes": 5
  }
]
```

#### GET `/suggestions/:id`
Récupère une suggestion par son ID.

**Paramètres :**
- `id` (number) - ID de la suggestion

**Réponse :**
```json
{
  "success": true,
  "suggestion": {
    "id": 1,
    "title": "Nouvelle fonctionnalité",
    "description": "Description de la suggestion",
    "category": "feature",
    "date": "2024-01-15T10:30:00.000Z",
    "status": "en attente",
    "nbLikes": 5
  }
}
```

#### POST `/suggestions`
Crée une nouvelle suggestion.

**Body (JSON) :**
```json
{
  "title": "Nouvelle fonctionnalité",
  "description": "Description de la suggestion",
  "category": "feature",
  "status": "en attente"
}
```

**Champs requis :**
- `title` (string) - Titre de la suggestion

**Champs optionnels :**
- `description` (string) - Description de la suggestion
- `category` (string) - Catégorie de la suggestion
- `status` (string) - Statut (défaut: "en attente")

**Réponse :**
```json
{
  "success": true,
  "message": "Suggestion créée avec succès",
  "id": 1
}
```

#### PUT `/suggestions/:id`
Met à jour une suggestion existante.

**Paramètres :**
- `id` (number) - ID de la suggestion

**Body (JSON) :**
```json
{
  "title": "Titre mis à jour",
  "description": "Nouvelle description",
  "category": "bugfix",
  "status": "approuvée",
  "nbLikes": 10
}
```

**Champs requis :**
- `title` (string) - Titre de la suggestion

**Réponse :**
```json
{
  "success": true,
  "message": "Suggestion mise à jour avec succès"
}
```

#### DELETE `/suggestions/:id`
Supprime une suggestion.

**Paramètres :**
- `id` (number) - ID de la suggestion

**Réponse :**
```json
{
  "success": true,
  "message": "Suggestion supprimée avec succès"
}
```

#### POST `/suggestions/:id/like`
Incrémente le nombre de likes d'une suggestion.

**Paramètres :**
- `id` (number) - ID de la suggestion

**Réponse :**
```json
{
  "success": true,
  "message": "Like ajouté avec succès"
}
```

#### GET `/suggestions/category/:category`
Récupère les suggestions par catégorie.

**Paramètres :**
- `category` (string) - Catégorie à filtrer

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "suggestions": [
    {
      "id": 1,
      "title": "Suggestion 1",
      "category": "feature",
      ...
    }
  ]
}
```

#### GET `/suggestions/status/:status`
Récupère les suggestions par statut.

**Paramètres :**
- `status` (string) - Statut à filtrer

**Réponse :**
```json
{
  "success": true,
  "count": 3,
  "suggestions": [
    {
      "id": 1,
      "title": "Suggestion 1",
      "status": "en attente",
      ...
    }
  ]
}
```

---

### Utilisateurs

#### GET `/users`
Récupère tous les utilisateurs.

**Réponse :**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET `/users/:id`
Récupère un utilisateur par son ID.

**Paramètres :**
- `id` (number) - ID de l'utilisateur

**Réponse :**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### POST `/users`
Crée un nouvel utilisateur.

**Body (JSON) :**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active"
}
```

**Champs requis :**
- `name` (string) - Nom de l'utilisateur
- `email` (string) - Email de l'utilisateur (doit être unique)

**Champs optionnels :**
- `role` (string) - Rôle de l'utilisateur (défaut: "user")
- `status` (string) - Statut (défaut: "active")

**Réponse :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "id": 1
}
```

#### PUT `/users/:id`
Met à jour un utilisateur existant.

**Paramètres :**
- `id` (number) - ID de l'utilisateur

**Body (JSON) :**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "admin",
  "status": "active"
}
```

**Champs requis :**
- `name` (string) - Nom de l'utilisateur
- `email` (string) - Email de l'utilisateur (doit être unique)

**Réponse :**
```json
{
  "success": true,
  "message": "Utilisateur mis à jour avec succès"
}
```

#### DELETE `/users/:id`
Supprime un utilisateur.

**Paramètres :**
- `id` (number) - ID de l'utilisateur

**Réponse :**
```json
{
  "success": true,
  "message": "Utilisateur supprimé avec succès"
}
```

#### GET `/users/role/:role`
Récupère les utilisateurs par rôle.

**Paramètres :**
- `role` (string) - Rôle à filtrer

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      ...
    }
  ]
}
```

#### GET `/users/status/:status`
Récupère les utilisateurs par statut.

**Paramètres :**
- `status` (string) - Statut à filtrer

**Réponse :**
```json
{
  "success": true,
  "count": 3,
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      ...
    }
  ]
}
```

---

### Commentaires

#### GET `/comments`
Récupère tous les commentaires.

**Réponse :**
```json
[
  {
    "id": 1,
    "suggestion_id": 1,
    "author": "John Doe",
    "content": "Très bonne idée !",
    "status": "visible",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET `/comments/:id`
Récupère un commentaire par son ID.

**Paramètres :**
- `id` (number) - ID du commentaire

**Réponse :**
```json
{
  "success": true,
  "comment": {
    "id": 1,
    "suggestion_id": 1,
    "author": "John Doe",
    "content": "Très bonne idée !",
    "status": "visible",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET `/comments/suggestion/:suggestionId`
Récupère les commentaires liés à une suggestion.

**Paramètres :**
- `suggestionId` (number) - ID de la suggestion

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "comments": [
    {
      "id": 1,
      "suggestion_id": 1,
      "author": "John Doe",
      "content": "Très bonne idée !",
      "status": "visible",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### POST `/comments`
Crée un nouveau commentaire.

**Body (JSON) :**
```json
{
  "suggestion_id": 1,
  "author": "John Doe",
  "content": "Très bonne idée !",
  "status": "visible"
}
```

**Champs requis :**
- `suggestion_id` (number) - ID de la suggestion associée
- `content` (string) - Contenu du commentaire

**Champs optionnels :**
- `author` (string) - Auteur du commentaire
- `status` (string) - Statut (défaut: "visible")

**Réponse :**
```json
{
  "success": true,
  "message": "Commentaire créé avec succès",
  "id": 1
}
```

#### PUT `/comments/:id`
Met à jour un commentaire existant.

**Paramètres :**
- `id` (number) - ID du commentaire

**Body (JSON) :**
```json
{
  "author": "Jane Doe",
  "content": "Commentaire mis à jour",
  "status": "hidden"
}
```

**Champs requis :**
- `content` (string) - Contenu du commentaire

**Réponse :**
```json
{
  "success": true,
  "message": "Commentaire mis à jour avec succès"
}
```

#### DELETE `/comments/:id`
Supprime un commentaire.

**Paramètres :**
- `id` (number) - ID du commentaire

**Réponse :**
```json
{
  "success": true,
  "message": "Commentaire supprimé avec succès"
}
```

---

### Tags

#### GET `/tags`
Récupère tous les tags.

**Réponse :**
```json
[
  {
    "id": 1,
    "name": "UI",
    "description": "Lié à l’interface utilisateur",
    "color": "#ff9900",
    "status": "active",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET `/tags/:id`
Récupère un tag par son ID.

**Paramètres :**
- `id` (number) - ID du tag

**Réponse :**
```json
{
  "success": true,
  "tag": {
    "id": 1,
    "name": "UI",
    "description": "Lié à l’interface utilisateur",
    "color": "#ff9900",
    "status": "active",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET `/tags/status/:status`
Récupère les tags par statut.

**Paramètres :**
- `status` (string) - Statut à filtrer

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "tags": [
    {
      "id": 1,
      "name": "UI",
      "status": "active",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### POST `/tags`
Crée un nouveau tag.

**Body (JSON) :**
```json
{
  "name": "UI",
  "description": "Lié à l’interface utilisateur",
  "color": "#ff9900",
  "status": "active"
}
```

**Champs requis :**
- `name` (string) - Nom du tag

**Champs optionnels :**
- `description` (string) - Description du tag
- `color` (string) - Couleur (code hex, mot-clé, etc.)
- `status` (string) - Statut (défaut: "active")

**Réponse :**
```json
{
  "success": true,
  "message": "Tag créé avec succès",
  "id": 1
}
```

#### PUT `/tags/:id`
Met à jour un tag existant.

**Paramètres :**
- `id` (number) - ID du tag

**Body (JSON) :**
```json
{
  "name": "Backend",
  "description": "Tâches côté serveur",
  "color": "#00aa00",
  "status": "inactive"
}
```

**Champs requis :**
- `name` (string) - Nom du tag

**Réponse :**
```json
{
  "success": true,
  "message": "Tag mis à jour avec succès"
}
```

#### DELETE `/tags/:id`
Supprime un tag.

**Paramètres :**
- `id` (number) - ID du tag

**Réponse :**
```json
{
  "success": true,
  "message": "Tag supprimé avec succès"
}
```

---

### Jardins

#### GET `/jardins`
Récupère tous les jardins.

**Réponse :**
```json
[
  {
    "id": 1,
    "adresse": "10 rue des Fleurs, Paris",
    "surface": 120.5,
    "dateEntretien": "2024-03-01",
    "statut": 1
  }
]
```

#### GET `/jardins/:id`
Récupère un jardin par son ID.

**Paramètres :**
- `id` (number) - ID du jardin

**Réponse :**
```json
{
  "success": true,
  "jardin": {
    "id": 1,
    "adresse": "10 rue des Fleurs, Paris",
    "surface": 120.5,
    "dateEntretien": "2024-03-01",
    "statut": 1
  }
}
```

#### POST `/jardins`
Crée un nouveau jardin.

**Body (JSON) :**
```json
{
  "adresse": "10 rue des Fleurs, Paris",
  "surface": 120.5,
  "dateEntretien": "2024-03-01",
  "statut": true
}
```

**Champs requis :**
- `adresse` (string) - Adresse du jardin
- `surface` (number) - Surface du jardin

**Champs optionnels :**
- `dateEntretien` (string, format `YYYY-MM-DD`) - Date du dernier entretien
- `statut` (boolean) - Statut du jardin (`true` = actif, `false` = inactif, défaut: `true`)

**Réponse :**
```json
{
  "success": true,
  "message": "Jardin créé avec succès",
  "id": 1
}
```

#### PUT `/jardins/:id`
Met à jour un jardin existant.

**Paramètres :**
- `id` (number) - ID du jardin

**Body (JSON) :**
```json
{
  "adresse": "20 avenue des Jardins, Lyon",
  "surface": 150,
  "dateEntretien": "2024-04-10",
  "statut": false
}
```

**Champs requis :**
- `adresse` (string)
- `surface` (number)

**Réponse :**
```json
{
  "success": true,
  "message": "Jardin mis à jour avec succès"
}
```

#### DELETE `/jardins/:id`
Supprime un jardin.

**Paramètres :**
- `id` (number) - ID du jardin

**Réponse :**
```json
{
  "success": true,
  "message": "Jardin supprimé avec succès"
}
```

#### GET `/jardins/statut/:statut`
Récupère les jardins par statut.

**Paramètres :**
- `statut` (string) - `true` ou `false` (ou `1` / `0`)

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "jardins": [
    {
      "id": 1,
      "adresse": "10 rue des Fleurs, Paris",
      "surface": 120.5,
      "dateEntretien": "2024-03-01",
      "statut": 1
    }
  ]
}
```

---

### Ateliers

#### GET `/ateliers`
Récupère tous les ateliers.

**Réponse :**
```json
[
  {
    "id": 1,
    "nom": "Atelier JavaScript",
    "emailFormateur": "formateur@example.com",
    "nbrParticipant": 20,
    "statut": 1
  }
]
```

#### GET `/ateliers/:id`
Récupère un atelier par son ID.

**Paramètres :**
- `id` (number) - ID de l'atelier

**Réponse :**
```json
{
  "success": true,
  "atelier": {
    "id": 1,
    "nom": "Atelier JavaScript",
    "emailFormateur": "formateur@example.com",
    "nbrParticipant": 20,
    "statut": 1
  }
}
```

#### POST `/ateliers`
Crée un nouvel atelier.

**Body (JSON) :**
```json
{
  "nom": "Atelier JavaScript",
  "emailFormateur": "formateur@example.com",
  "nbrParticipant": 20,
  "statut": true
}
```

**Champs requis :**
- `nom` (string) - Nom de l'atelier
- `nbrParticipant` (number) - Nombre de participants

**Champs optionnels :**
- `emailFormateur` (string) - Email du formateur
- `statut` (boolean) - Statut de l'atelier (`true` = actif, `false` = inactif, défaut: `true`)

**Réponse :**
```json
{
  "success": true,
  "message": "Atelier créé avec succès",
  "id": 1
}
```

#### PUT `/ateliers/:id`
Met à jour un atelier existant.

**Paramètres :**
- `id` (number) - ID de l'atelier

**Body (JSON) :**
```json
{
  "nom": "Atelier Node.js",
  "emailFormateur": "new-formateur@example.com",
  "nbrParticipant": 25,
  "statut": false
}
```

**Champs requis :**
- `nom` (string)
- `nbrParticipant` (number)

**Réponse :**
```json
{
  "success": true,
  "message": "Atelier mis à jour avec succès"
}
```

#### DELETE `/ateliers/:id`
Supprime un atelier.

**Paramètres :**
- `id` (number) - ID de l'atelier

**Réponse :**
```json
{
  "success": true,
  "message": "Atelier supprimé avec succès"
}
```

#### GET `/ateliers/statut/:statut`
Récupère les ateliers par statut.

**Paramètres :**
- `statut` (string) - `true` ou `false` (ou `1` / `0`)

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "ateliers": [
    {
      "id": 1,
      "nom": "Atelier JavaScript",
      "emailFormateur": "formateur@example.com",
      "nbrParticipant": 20,
      "statut": 1
    }
  ]
}
```

## 💡 Exemples de requêtes

### Avec cURL

#### Créer une suggestion
```bash
curl -X POST http://localhost:3000/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle fonctionnalité",
    "description": "Description de la suggestion",
    "category": "feature"
  }'
```

#### Récupérer toutes les suggestions
```bash
curl http://localhost:3000/suggestions
```

#### Créer un utilisateur
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'
```

#### Mettre à jour un utilisateur
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "admin",
    "status": "active"
  }'
```

### Avec JavaScript (Fetch API)

```javascript
// Créer une suggestion
const response = await fetch('http://localhost:3000/suggestions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nouvelle fonctionnalité',
    description: 'Description de la suggestion',
    category: 'feature'
  })
});

const data = await response.json();
console.log(data);
```

## ⚠️ Gestion des erreurs

L'API retourne des réponses d'erreur standardisées :

### Erreur 400 - Bad Request
```json
{
  "success": false,
  "error": "Le titre est requis"
}
```

### Erreur 404 - Not Found
```json
{
  "success": false,
  "error": "Suggestion non trouvée"
}
```

### Erreur 500 - Internal Server Error
```json
{
  "success": false,
  "error": "Erreur serveur interne"
}
```

### Erreur 404 - Route non trouvée
```json
{
  "success": false,
  "error": "Route non trouvée"
}
```

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver MySQL avec support des promesses
- **CORS** - Middleware pour gérer les requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

## 📝 Notes

- Toutes les dates sont retournées au format ISO 8601
- Les emails doivent être uniques dans la table `users`
- Le champ `title` est requis pour les suggestions
- Les champs `name` et `email` sont requis pour les utilisateurs
- Les routes sont sensibles à la casse

