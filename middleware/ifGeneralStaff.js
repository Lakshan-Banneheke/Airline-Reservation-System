const ifGeneralStaff = (req, res, next) => {
    if (req.session.user && req.session.user.type === 'staff' && req.session.user.staff_category === 'general') {
        next();
    } else {
        res.render('401');
    }
};

module.exports = ifGeneralStaff;
