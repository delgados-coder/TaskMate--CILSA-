var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', {css: 'dashboard', loggedIn: true});
});

module.exports = router;
