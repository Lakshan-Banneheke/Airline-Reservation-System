const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {//if not logged in
        next();
    }
};

module.exports = ifNotLoggedIn;