// const rp = require('request-promise');
const knex = require('../connection');

class Question {
  constructor(id, name, ownerId) {
    this.id = id;
    this.name = name;
    this.gameId = ownerId;
  }

  static getQuestionById(id) {
    return knex('questions').where({ id }).then(results => (results[0]));
  }

  static getQuestions(options) {
    return knex('questions').where(options).then(results => (results));
  }

}

module.exports = Question;
