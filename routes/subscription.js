const router = require('express').Router();
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//Subscription GET Route
router.get('/available', isLoggedIn, (req, res, next) => {
    res.render('subscriptions/all-subscriptions.hbs');
});

//Payment GET Route
router.get('/payment', isLoggedIn, (req, res, next) => {
    res.render('subscriptions/payment.hbs');
});

//Payment POST Route
router.post('/payment', isLoggedIn, (req, res, next) => {
    const { subType, cardNum, cardName, expDate, cvv, address, city, state, zip } = req.body;
    if (!cardNum || !cardName || !expDate || !cvv || !address || !city || !state || !zip) {
        res.render('subscriptions/payment.hbs', {errorMessage: "All fields are mandatory"});
    }
    else {
        bcryptjs
        .genSalt(saltRounds)
        .then((salt) => {
            return bcryptjs.hash(cardNum, salt);
        })
        .then((saltedCardNum) => {
            return Subscription.create({
                cardNum: saltedCardNum,
                cardName,
                expDate,
                cvv,
                address,
                city,
                state,
                zip
            });
        })
        .then((newSubscription) => {
            return User.findByIdAndUpdate(req.session.user._id, {
                subscription: newSubscription._id,
                subType,
                address: `${address} ${city} ${state} ${zip}`
            }, {new: true});
        })
        .then((updatedUser) => {
            req.session.user = updatedUser;
            res.redirect('/users/preferences')
        })
        .catch((err) => {
            next(err);
        });
    }
});

router.get('/cancel', (req ,res ,next) => {
    const id = req.session.user._id;
    const subId = req.session.user.subscription;

    User.findByIdAndUpdate(id, {
        subscription: null,
        subType: 'N/A'
        }, {new: true})
        .then((updatedUser) => {
            req.session.user = updatedUser;
            return updatedUser;
        })
        .then((updatedUser) => {
            Subscription.findByIdAndDelete(subId)
                .then((deletedSubscription) => {
                    res.redirect('/users/profile');
                })
                .catch((err) => {
                    next(err)
                });
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
