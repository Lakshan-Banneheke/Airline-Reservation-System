const ifGuestOrRegisteredCustomer = (req, res, next) => {
    if ((!req.session.user || req.session.user.type === 'guest') || (req.session.user && req.session.user.type === 'registered')) {
        next();
    } else {
        res.render('401');
    }
};

module.exports = ifGuestOrRegisteredCustomer;
