const Post = require('../model/postScheme');

//methode qui affiche la page d'accueil
exports.showHome = async (req, res) => {
    try {
        //on récupère l'id du user connecté
        const user = req.user._id;

        //on recupère les posts du user connecté
        const userPosts = await Post.find({ author: user });
        //on affiche la page d'accueil avec les post du user connecté
        res.render('accueil', { userPosts });

    } catch (error) {

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

//méthode afficher le formulaires qui modifie les post
exports.showEditPost = async (req, res) => {
    try {
        //on récupère l'id du post
        const postId = req.params.id;

        //on recupère les données du post grace a son id
        const post = await Post.findById(postId);

        //on verifie que le post appartient bien au user connecter
        if (post.author.equals(req.user._id)) {
            //on renvoie la vue de modification de post avec les données du post
            return res.render('post/edit', { post: post });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('post/edit', { error: 'Une erreur est survenue, veuillez réessayer' });
    }
}


//  1 er méthode qui met a jours un post
exports.editPost = async (req, res) => {
    try {
        //on recupère les données du post
        const { title, content } = req.body;
        //on récupère l'id du post
        const postId = req.params.id;
        //on met à jour le post
        const post = await Post.findById(postId);

        //on verifie si l'utilisateur est bien l'auteur du post
        if (post.author.equals(req.user._id)) {
            //on met à jour le post
            post.title = title;
            post.content = content;
            post.updated_at = new Date();
            //on sauvegarde le post
            await post.save();
            //on redirige vers la page d'accueil
            res.redirect('/');

        } else {
            //on redirige vers la page d'accueil
            res.redirect('/');
        }
    } catch (error) {
        //on retourne un message d'erreur
        res.render('post/edit', { error: 'Une erreur est survenue, veuillez réessayer' });
    }
}

// 2 eme méthode qui met a jours un post
// exports.editPost = async (req, res) => {
//     try {
//         //on recupère les données du post
//         const { title, content } = req.body;
//         //on récupère l'id du post
//         const postId = req.params.id;
//         //on met à jour le post
//         const post = await Post.findById(postId);

//         //on verifie si l'utilisateur est bien l'auteur du post
//         if (post.author.equals(req.user._id)) {
//             //on met à jour le post
//             await Post.updateOne({ _id: postId }, { title: title, content: content });
//             //on redirige vers la page d'accueil
//             res.redirect('/');
//         } else {
//             res.redirect('/');
//         }
//     } catch (error) {
//         //on retourne un message d'erreur
//         res.render('post/edit', { error: 'Une erreur est survenue, veuillez réessayer' });
//     }
// 


//méthode qui suprime le post
exports.deletePost = async (req, res) => {
    try {
        //on recupère l'id du post
        const postId = req.params.id;

        //on recupère le post grace a son id
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send('404', { message: 'Arrete de jouer avec les urls' });
        }

        //on verifie que le post appartient bien au user connecter
        if (post.author.equals(req.user._id)) {
            //on supprime le post
            await Post.deleteOne({ _id: postId });
            //on redirige vers la page d'accueil
            res.redirect('/');
        } else {
            //on redirige vers la page d'accueil
            res.redirect('/');
        }
    } catch (error) {

    }
}



