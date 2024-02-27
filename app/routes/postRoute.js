const express = require('express');
const router = express.Router();
//TODO: Créer ensurAuthenticator dans Middlewares
const {ensureAuthenticator} = require('../middlewares/authMiddleware');

//Page d'accueil
router.get('/', ensureAuthenticator, (req, res)=> {
  res.render('accueil');
});

//TODO: Les autres routes à prévoir

module.exports = router;