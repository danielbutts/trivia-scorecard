// const rp = require('request-promise');
const knex = require('../connection');

class Answer {
  constructor(id, answer, gameId, teamId, isCorrect) {
    this.id = id;
    this.answer = answer;
    this.gameId = gameId;
    this.teamId = teamId;
    this.teamId = isCorrect;
  }

  static getAnswerById(id) {
    return knex('answers').where({ id }).then(results => (results[0]));
  }

  static getAnswers(options) {
    return knex('answers').where(options).then(results => (results));
  }

}

module.exports = Answer;
