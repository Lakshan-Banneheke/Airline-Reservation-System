const ifStaffRedirectToStaffHome = (req, res, next) => {
    if (req.session.user && req.session.user.type === 'staff') {
        res.redirect(`/staff/${req.session.user.staff_category}`);
    } else {
        next();
    }
};

module.exports = ifStaffRedirectToStaffHome;
