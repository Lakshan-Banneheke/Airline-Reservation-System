const ifStaff = (req, res, next) => {
    if (req.session.user && req.session.user.type === 'staff') {
        next();
    } else {
        res.render('401');
    }
};

module.exports = ifStaff;
