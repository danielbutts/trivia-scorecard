// const rp = require('request-promise');
const knex = require('../connection');

class Team {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static getTeamById(id) {
    return knex('teams').where({ id }).then(results => (results[0]));
  }

  static getTeams(options) {
    return knex('teams').where(options).then(results => (results));
  }

}

module.exports = Team;
