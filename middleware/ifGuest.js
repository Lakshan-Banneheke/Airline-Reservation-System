const ifGuest = (req, res, next) => {
    if (!req.session.user || req.session.user.type === 'guest') {
        next();
    }
};

module.exports = ifGuest;
