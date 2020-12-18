const ifLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } 
    // else {
    //     res.redirect('/');
    // }
};

module.exports = ifLoggedIn;