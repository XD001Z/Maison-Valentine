const router = require('express').Router();
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.get('/available', isLoggedIn, (req, res, next) => {
    res.render('subscriptions/all-subscriptions.hbs');
});

router.get('/payment', isLoggedIn, (req, res, next) => {
    res.render('subscriptions/payment.hbs');
});

router.post('/payment', isLoggedIn, (req, res, next) => {
    const { subType, cardNum, cardName, expDate, cvv, address, city, state, zip } = req.body;
    if (!cardNum || !cardName || !expDate || !cvv || !address || !city || !state || !zip) {
        res.render('subcription/payment', {errorMessage: "All fields are mandatory"});
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
                $push: {subscriptions: newSubscription._id}
            });
        })
        .then((updatedUser) => {
            res.redirect('/subscription/preferences')
        })
        .catch((err) => {
            next(err);
        });
    }
});

router.get('/preferences', (req, res, next) => {
    res.render('subscriptions/preferences.hbs');
});

module.exports = router;
