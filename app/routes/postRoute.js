const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
//Middlewares pour verifier si le user est connecté
const { ensureAuthenticator } = require('../middlewares/authMiddleware');



//Route pour afficher le form de créeation de post 
router.get('/add', ensureAuthenticator, postController.showAddPost);

//Route qui receptionne les données du formulaire de créeation de post
router.post('/add', ensureAuthenticator, postController.addPost);

//Route qui renvoie le formulaire de modification de post
router.get('/edit/:id', ensureAuthenticator, postController.showEditPost);

//Route qui receptionne les données du formulaire de modification de post
router.post('/edit/:id', ensureAuthenticator, postController.editPost);

//Route pour suprimer le post 
router.get('/delete/:id', ensureAuthenticator, postController.deletePost);


module.exports = router;