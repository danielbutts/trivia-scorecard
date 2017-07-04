const express = require('express');
const checkSession = require('./session').checkSession;

const router = express.Router();

router.use(checkSession);
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
