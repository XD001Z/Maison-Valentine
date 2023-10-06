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
    res.render('users/preferences.hbs', req.session.user);
});

router.post('/edit',(req, res, next) => {
    const { subType, name, lastName, address, city, state, zip, preference1, preference2, preference3 } = req.body;
    const userId = req.session.user._id;
    const subId = req.session.user.subscription;

    let filledFieldsUser = {};
    let filledFieldsSubscription = {};

    if (subType) filledFieldsUser.subType = subType;
    if (subType) filledFieldsSubscription.subType = subType;
    if (name) filledFieldsUser.name = name;
    if (lastName) filledFieldsUser.lastName = lastName;
    if (address) filledFieldsSubscription.address = address;
    if (city) filledFieldsSubscription.city = city;
    if (state) filledFieldsSubscription.state = state;
    if (zip) filledFieldsSubscription.zip = zip;
    if (preference1) filledFieldsSubscription.preference1 = preference1;
    if (preference2) filledFieldsSubscription.preference2 = preference2;
    if (preference3) filledFieldsSubscription.preference3 = preference3;

    Subscription.findByIdAndUpdate(subId, filledFieldsSubscription, {new: true})
        .then((updatedSubscription) => {
            if (updatedSubscription !== null) {
                filledFieldsUser.address = `${updatedSubscription.address} ${updatedSubscription.city} ${updatedSubscription.state} ${updatedSubscription.zip}`;
                User.findByIdAndUpdate(userId, filledFieldsUser, {new: true})
                    .then((updatedUser) => {
                        req.session.user = updatedUser;
                        res.redirect('/users/profile');
                    })
                    .catch((err) => {
                        next(err);
                    });
            }
            else {
                User.findByIdAndUpdate(userId, filledFieldsUser, {new: true})
                    .then((updatedUser) => {
                        req.session.user = updatedUser;
                        res.redirect('/users/profile');
                    })
                    .catch((err) => {
                        next(err);
                    });
            }
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/preferences', (req, res, next) => {
    const { preference1, preference2, preference3 } = req.body;
    const subId = req.session.user.subscription;

    Subscription.findByIdAndUpdate(subId, {
      preference1,
      preference2,
      preference3
    }, {new: true})
      .then((updatedSubscription) => {
        res.redirect('/users/profile');
      })
      .catch((err) => {
        next(err)
      });
  });

module.exports = router;
