const ifMng = (req, res, next) => {
    if (req.session.user && req.session.user.type === 'staff' && req.session.user.staff_category === 'manager') {
        next();
    } else {
        res.render('401');
    }
};

module.exports = ifMng;
