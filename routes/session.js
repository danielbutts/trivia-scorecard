const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../db/connection');

const router = express.Router();

const checkSession = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const unauthorized = {
      status: 401,
      message: 'Unauthorized',
    };
    next(unauthorized);
  }
};

router.post('/', (req, res, next) => {
  const { name, password } = req.body;
  let error;
  if (name === '' || name.trim() === '') {
    res.status(400).json({ error: 'Name must not be blank' });
  } else if (password === '') {
    res.status(400).json({ error: 'Password must not be blank' });
  } else {
    let user;
    knex('users').where({ name })
      .then((users) => {
        if (users.length === 0) {
          res.status(400).json({ error: 'Bad email or password' });
        } else {
          user = users[0];
          bcrypt.compare(password, user.password).then(() => {
            delete user.password;
            req.session.userId = user.id;
            if (error !== undefined) {
              res.status(400).json({ error });
            } else {
              res.status(200).json({});
            }
          })
          .catch(bcrypt.MISMATCH_ERROR, () => {
            error = 'Bad email or password';
            res.status(400).json({ error });
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/auth/login');
});

module.exports = { router, checkSession };
