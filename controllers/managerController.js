const StaffService = require('../services/StaffServices');

class ManagerController {
    static async homePage(req, res) {
        try {
            const unverifiedStaff = await StaffService.getAllUnverifiedGeneralStaff();
            res.render('staff_manager_home', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                unverifiedStaff,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    static async allGeneralStaffPage(req, res) {
        try {
            const staffMembers = await StaffService.getAllVerifiedGeneralStaff();
            res.render('staff_manager_all_general_staff', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                staffMembers,
            });
        } catch (e) {
            console.log(e);
            res.send(500).render('500');
        }
    }

    static async verifyStaff(req, res) {
        try {
            await StaffService.verifyStaff(req.body.empId);
            res.redirect('/staff/manager?success=Account Approval Successful.');
        } catch (e) {
            res.redirect(`/staff/manager?error=${e}`);
        }
    }

    static async deleteStaff(req, res) {
        try {
            await StaffService.deleteStaff(req.body.empId);
            res.redirect('/staff/manager?success=Account Disapproval Successful.');
        } catch (e) {
            res.redirect(`/staff/manager?error=${e}`);
        }
    }

    static async searchGeneralStaff(req, res) {
        try {
            let staffLike;
            if (req.query.query !== '') {
                staffLike = await StaffService.getGeneralStaffWhereNameLike(req.query.query);
            } else {
                staffLike = await StaffService.getAllVerifiedGeneralStaff();
            }

            const resObj = {
                success: true,
                staffMembers: staffLike,
            };
            res.json(resObj);
        } catch (e) {
            res.json({
                success: false,
                error: e,
            });
        }
    }
}

module.exports = ManagerController;
