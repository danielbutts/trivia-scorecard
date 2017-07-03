// const rp = require('request-promise');
const knex = require('../connection');

class User {
  constructor(id, name, password, isAdmin) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  static getUserById(id) {
    return knex('users').where({ id }).then(results => (results[0]));
  }

  static getUsers(options) {
    let query = knex('users');

    if (options !== undefined) {
      query = query.where(options);
    }

    return query.then(results => results);
  }

  static createUser(options) {
    console.log(options);
    return knex('users').returning('*').insert(options);
  }

}

module.exports = User;
