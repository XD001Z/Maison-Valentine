const router = require('express').Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//Signup GET Route
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
});

//Login GET Route
router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
});

//Signup POST Route
router.post('/signup', (req, res, next) => {
  const { name, lastName, email, password, verify } = req.body;
  if (!name || !lastName || !email || !password || !verify) {
    res.render('auth/signup.hbs', {errorMessage: "All fields are mandatory"});
  }
  else if (password !== verify) {
    res.render('auth/signup.hbs', {errorMessage: "Passwords do not match"});
  }
  else {
    User.findOne({email})
      .then((foundUser) => {
        if (!foundUser) {
          bcryptjs
            .genSalt(saltRounds)
            .then((salt) => {
              return bcryptjs.hash(password, salt);
            })
            .then((saltedPassword) => {
              return User.create({
                email,
                name,
                lastName,
                password: saltedPassword
              });
            })
            .then((createdUser) => {
              req.session.user = createdUser;
              res.redirect('/users/profile');
            })
            .catch((err) => {
              next(err);
            });
        }
        else {
          res.render('auth/signup.hbs', {errorMessage: "Email is in use"});
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

//Login POST Route
router.post('/login', (req, res, next) => {
  const { email, password } = req.body; 
  if (email === '' || password === '') {
    res.render('auth/login', {errorMessage: "Enter both email and password"});
  }
  else {
    User.findOne({email})
      .then((user) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          req.session.user = user;
          res.redirect('/users/profile'); 
        }
        else {
          res.render('auth/login', {errorMessage: "Incorrect email/password"});
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

//Logout Route
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);  
    }
    res.redirect('/');
  });
});
   
module.exports = router;
