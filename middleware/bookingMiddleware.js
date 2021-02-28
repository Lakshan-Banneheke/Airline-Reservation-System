function checkForScheduleID(req, res, next) {
    if (typeof req.body.schedule_id !== 'undefined') {
        next();
    } else if (typeof req.query.schedule_id !== 'undefined'){
        next();
    } else {
        res.status(405).render('405');
    }
}


 module.exports= {checkForScheduleID}