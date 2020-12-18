class RootController {
    static async root(req, res) {
        if (req.session.user == null) {
            res.render('index',{user:req.session.user});
            return;
        }
    }
}


module.exports = RootController;