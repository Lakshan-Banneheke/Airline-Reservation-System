const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.render('401');
    }
};

module.exports = ifNotLoggedIn;
