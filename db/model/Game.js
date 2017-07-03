// const rp = require('request-promise');
const knex = require('../connection');

class Game {
  constructor(id, name, ownerId) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
  }

  static getGameById(id) {
    return knex('games').where({ id }).then(results => (results[0]));
  }

  static getGames(options) {
    return knex('games').where(options).then(results => (results));
  }

}

module.exports = Game;
