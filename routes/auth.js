const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
