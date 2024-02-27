const passport = require('../passport-config');
const User = require('../model/userScheme');
const bcrypt = require('bcrypt');

//Affiche le formulaire d'inscription
exports.showRegistrationForm = (req, res) => {
  res.render('register', { error: null });
}

//enregistrement d'un new User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Verifier si le user existe deja
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { error: 'Email déja utilisé' });
    }
    //on verfie si les champs soient remplis
    if (name === '' || email === '' || password === '') {
      return res.render('register', { error: 'Tous les champs doivent être remplis' });
    }

    //on hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    //on crée l'objet utilisateur
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    //on sauvegarde l'utilisateur dans la base de données
    await newUser.save();

    res.redirect('/login');

  } catch (error) {
    console.error(error);
    res.redirect('/register', { error: 'Une erreur serveur est survenue' });
  }
}

//affiche le fom de connexion 
exports.showLoginForm = (req, res) => {
  res.render('login');
}

//connexion du user
exports.loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

//deconnexion du user
exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/login');
}


