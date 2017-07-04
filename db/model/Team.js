const knex = require('../connection');

class Team {
  constructor(id, name, score) {
    this.id = id;
    this.name = name;
    this.score = score || 0;
  }

  static getTeamById(id) {
    knex('teams').where({ id }).then((results) => {
      if (results.length !== 0) {
        return new Team(results[0].id, results[0].name, results[0].score);
      }
      return undefined;
    });
  }

  static getTeams(options) {
    const teams = [];
    knex('teams').where(options).then((results) => {
      results.forEach((result) => {
        teams.push(new Team(result.id, result.name, result.score));
      });
      return teams;
    });
  }

  increaseScore(points) {
    knex('teams').where({ id: this.id }).update({ score: this.score + points }).returning('*')
    .then(results => (results[0]));
  }

}

module.exports = Team;
