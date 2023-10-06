const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('index', req.session.user);
  });

module.exports = router;
