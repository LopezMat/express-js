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

//affiche le form de connexion 
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

//méthode pour afficher le formulaire de modification de compte
exports.showEditProfile = async (req, res) => {
  try {
    //on récupère l'id du user
    const userId = req.user._id;

    //on recupère le user grace a son id
    const user = await User.findById(userId);

    //on verifie que le compte appartient bien au user connecter
    if (user._id.equals(req.user._id)) {
      //on affiche le formulaire de modification de compte
      return res.render('user/profile', { error: null, user: user });
    } else {
      res.redirect('/');
    }

  } catch (error) {
    //on affiche le formulaire de modification de compte avec un message d'erreur
    res.render('user/profile', { error: 'Une erreur est survenue, veuillez réafficher le formulaire' });
  }
};

//méthode qui met à jour le compte
exports.editProfile = async (req, res) => {
  try {
    //on recupère les nouveaux données du user
    const { nom, email } = req.body;
    //on recupère l'id du user
    const userId = req.user._id;
    //on verifie de le mail n'existe pas deja
    const existingUser = await User.findOne({ email });
    if (existingUser && !existingUser._id.equals(userId)) {
      return res.render('user/profile', { error: 'Email déja utilisé', user: req.user });
    }

    //On verifie si l'ancien mot de passe est le bon
    const user = await User.findById(userId);
    if (!await bcrypt.compare(req.body.ancien_mdp, user.password)) {
      return res.render('user/profile', { error: 'Le mot de passe est incorrect', user: req.user });
    }

    console.log('b');

    //on verifie que les nouveaux mot de passe soit identiques
    if (req.body.new_mdp !== req.body.new_mdp_confirm) {
      return res.render('user/profile', { error: 'Les nouveaux mots de passe ne sont pas identiques', user: req.user });
    }
    console.log('c');
    //on verifie que les champs soient remplis
    if (nom === '' || email === '') {
      return res.render('user/profile', { error: 'Tous les champs doivent être remplis', user: req.user });
    }
    console.log('d');

    //on met à jour le user
    user.name = nom;
    user.email = email;
    user.password = await bcrypt.hash(req.body.new_mdp, 10);
    console.log('e');
    //on sauvegarde le user
    await user.save();
    console.log('f');
    res.redirect('/');
  } catch (error) {
    //on affiche le formulaire de modification de compte avec un message d'erreur
    res.render('user/profile', { error: 'Une erreur est survenue, veuillez réafficher le formulaire', user: req.user });
  }
}



