const router = require('express').Router();
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('users/user-profile.hbs', req.session.user)
});

router.get('/edit', isLoggedIn, (req, res, next) => {
    res.render('users/user-edit.hbs', req.session.user);
});

router.get('/preferences', (req, res, next) => {
    res.render('users/preferences.hbs')
});

router.post('/edit',(req, res, next) => {
    const { subType, name, lastName, address, city, state, zip, preference1, preference2, preference3 } = req.body;
    // const { name, lastName, address, city, state, zip, subscription,
    //      dessertStyle, dessertBeverage, seasonal } = req.body;

    const userId = req.session.currentUser._id;
    const userSubscription = req.session.currentSubscription._id
    User.findByIdAndUpdate(userId,userSubscription, {
        name,
        lastName,
        // address,
        // city,
        // state,
        // zip,
        // subscription,
        // dessertStyle,
        // dessertBeverage,
        // seasonal
    }, (error, updatedUser) => {
        if (error) {
            // Si hay un error, pasa el control al middleware de manejo de errores
            next(error);
            return;
        }
    
        // Redirigir al perfil del usuario después de la actualización
        res.redirect('/users/profile');
    });

});

module.exports = router;

//va para profile 