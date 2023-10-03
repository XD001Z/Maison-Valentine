const router = require('express').Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile/user-profile.hbs')
});

router.get('/edit', isLoggedIn, (req, res, next) => {
    res.render('profile/user-edit.hbs');
});

module.exports = router;
