const router = require('express').Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

router.get('/plans', isLoggedIn, (req, res, next) => {
    res.render('membership/membership-plans.hbs');
});

module.exports = router;
