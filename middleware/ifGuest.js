const ifGuest = (req, res, next) => {
    if (!req.session.user || req.session.user.type === 'guest') {
        next();
    } else {
        res.render('401');
    }
};

module.exports = ifGuest;
