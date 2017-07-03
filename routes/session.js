const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../db/connection');

const router = express.Router();

router.get('/session', (req, res) => {
  console.log('get /session');
  if (req.session.userId !== undefined) {
    res.status(200).json(true);
  } else {
    res.status(200).json(false);
  }
});

router.post('/session', (req, res, next) => { // eslint-disable-line consistent-return
  console.log('post /session');
  const { name, password } = req.body;

  if (!name || !name.trim()) {
    return next({
      status: 400,
      message: 'Email must not be blank',
    });
  }
  if (!password) {
    return next({
      status: 400,
      message: 'Password must not be blank',
    });
  }

  let user;
  knex('users').where({ name }).then((rows) => {
    if (rows.length === 0) {
      throw new Error({
        status: 400,
        message: 'Bad email or password',
      });
    }
    user = rows[0];

    return bcrypt.compare(password, user.hashed_password);
  })
  .then(() => {
    delete user.hashed_password;
    req.session.userId = user.id;
    res.send(user);
  })
  .catch(bcrypt.MISMATCH_ERROR, () => {
    throw new Error({
      status: 400,
      message: 'Bad email or password',
    });
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

router.delete('/session', (req, res) => {
  req.session = null;
  res.status(200).json(true);
});

module.exports = router;
