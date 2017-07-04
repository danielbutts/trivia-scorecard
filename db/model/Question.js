// const rp = require('request-promise');
const knex = require('../connection');

class Question {
  constructor(id, text, gameId, points) {
    this.id = id;
    this.text = text;
    this.gameId = gameId;
    this.points = points;
  }

  static getQuestionById(id) {
    knex('questions').where({ id }).then(results => (results[0]));
  }

  static getQuestions(options) {
    knex('questions').where(options).then(results => (results));
  }

  saveQuestion() {
    knex('questions').insert({
      text: this.text,
      game_id: this.gameId,
      points: this.points,
    }).returning('*')
    .then(results => results[0]);
  }
}

module.exports = Question;
