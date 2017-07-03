const express = require('express');
const User = require('../db/model/User');
// const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const router = express.Router();

router.get('/', (req, res) => {
  User.getUsers().then((users) => {
    console.log(users);
    res.render('users', { users });
  });
});

router.post('/', (req, res, next) => {
  const { name, password, isAdmin } = req.body;
  if (name === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (password === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'password\'.' });
  } else {
    User.getUsers({ name }).then((results) => { // eslint-disable-line consistent-return
      if (results.length > 0) {
        res.status(400).json({ error: 'Username already exists.' });
      } else {
        return bcrypt.hash(password, 12).then((hashedPassword) => {
          User.createUser({ name, password: hashedPassword, isAdmin });
        }).then((users) => {
          const user = users[0];
          delete user.hashed_password;
          req.session.userId = user.id;
          res.json({ message: 'Successfully created user.', user: users[0] });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
