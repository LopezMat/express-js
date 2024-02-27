const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const postController = require('../controller/postController');
const { ensureAuthenticator } = require('../middlewares/authMiddleware');

//Route d'acceuil
router.get('/', ensureAuthenticator, postController.showHome);

//Page formulaire de connexion
router.get('/login', authController.showLoginForm);
//Route qui receptionne les données du formulaire de connexion
router.post('/login', authController.loginUser);

//Page formulaire de création de compte
router.get('/register', authController.showRegistrationForm);
//Route qui receptionne les données du formulaire de création de compte
router.post('/register', authController.registerUser);


module.exports = router;

