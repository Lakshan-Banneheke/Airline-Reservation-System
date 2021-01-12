const ifRegisteredCustomer = (req, res, next) => {
    if (req.session.user && req.session.user.type === 'registered') {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = ifRegisteredCustomer;
