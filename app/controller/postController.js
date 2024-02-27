const Post = require('../model/postScheme');

//methode qui affiche la page d'accueil
exports.showHome = async (req, res) => {
    try {
        //on récupère l'id du user connecté
        const user = req.user._id;

        //on recupère les posts du user connecté
        const posts = await Post.find({ author: userId }.sort({ created_at: 'desc' }));
        //on affiche la page d'accueil avec les post du user connecté
        res.render('home', { userPosts });

    } catch (error) {
        console.log(error);
    }
};

//methode qui affiche le formulaire d'ajout de post
exports.showAddPost = (req, res) => {
    res.render('post/add', { error: null });
};

//methode qui ajoute un post dans la bdd
exports.addPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        //on recupère l'id du user
        const author = req.user._id;
        //on crée l'objet post
        const newPost = new Post({
            title: title,
            content: content,
            author: author,
            created_at: new Date(),
        });
        //on sauvegarde l'objet post dans la base de données
        await newPost.save();
        //on redirige vers la page d'accueil
        res.redirect('/');
    } catch (error) {
        //on redirige vers le formulaire d'ajout de post avec un message d'erreur
        res.render('post/add', { error: 'Une erreur est survenue' });
    }
};