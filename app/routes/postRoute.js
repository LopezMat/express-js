const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
//Middlewares pour verifier si le user est connecté
const { ensureAuthenticator } = require('../middlewares/authMiddleware');



//Route pour afficher le form de créeation de post 
router.get('/add', ensureAuthenticator, postController.showAddPost);

//Route qui receptionne les données du formulaire de créeation de post
router.post('/add', ensureAuthenticator, postController.addPost);

module.exports = router;