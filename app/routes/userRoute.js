const express = require('express');
const { ensureAuthenticator } = require('../middlewares/authMiddleware');
const router = express.Router();
const authController = require('../controller/authController');

//TODO: Routes pour la gestion des utilisateurs

//méthode pour afficher les profile du user
router.get('/profile', ensureAuthenticator, authController.showEditProfile);

//méthode qui sauvegarde les modifications du profile
router.post('/profile', ensureAuthenticator, authController.editProfile);



module.exports = router;