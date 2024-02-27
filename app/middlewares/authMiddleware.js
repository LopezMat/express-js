module.exports = {
  ensureAuthenticator: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
  }
}

// module.exports = {
//   ensureAuthenticator: (req, res, next)=>{

//   }
// }