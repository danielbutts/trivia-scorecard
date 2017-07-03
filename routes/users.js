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
  console.log('post /users');
  const { name, password } = req.body;
  const isAdmin = req.body.isAdmin || false;
  if (name === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (password === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'password\'.' });
  } else {
    console.log('here');
    User.getUsers({ name }).then((results) => { // eslint-disable-line consistent-return
      if (results.length > 0) {
        console.log('there');
        res.status(400).json({ error: 'Username already exists.' });
      } else {
        console.log('wherever');
        return bcrypt.hash(password, 12).then(hashedPassword =>
          User.createUser({
            name,
            password: hashedPassword,
            is_admin: isAdmin }))
        .then((inserts) => {
          console.log(inserts);
          const user = inserts[0];
          delete user.hashed_password;
          req.session.userId = user.id;
          res.json({ message: 'Successfully created user.', user });
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
