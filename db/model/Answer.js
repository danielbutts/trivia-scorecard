// const rp = require('request-promise');
const knex = require('../connection');
const Team = require('./Team');
const Question = require('./Question');

class Answer {
  constructor(id, answer, gameId, teamId, questionId, isCorrect) {
    this.id = id;
    this.answer = answer;
    this.gameId = gameId;
    this.teamId = teamId;
    this.questionId = questionId;
    this.isCorrect = isCorrect;
  }

  static getAnswerById(id) {
    knex('answers').where({ id }).then(results => buildAnswer(results[0])); // eslint-disable-line no-use-before-define
  }

  static getAnswers(options) {
    const answers = [];
    knex('answers').where(options).then((results) => {
      results.forEach((result) => {
        answers.push(buildAnswer(result)); // eslint-disable-line no-use-before-define
      });
      return answers;
    });
  }

  saveAnswer() {
    knex('answers').insert({
      answer: this.answer,
      gameId: this.gameId,
      teamId: this.teamId,
      is_correct: this.isCorrect,
    }).returning('*').then(results => buildAnswer(results[0])); // eslint-disable-line no-use-before-define
  }

  scoreAnswer() {
    knex('answers').where({ id: this.id, is_correct: null })
    .then(results => results.length > 0) // eslint-disable-line no-use-before-define
    .then((isAnswered) => {
      if (!isAnswered) {
        knex('answers').where({ id: this.id }).update({ is_correct: this.isCorrect }).returning('*')
        .then((results) => {
          const answer = buildAnswer(results[0]); // eslint-disable-line no-use-before-define
          if (this.isCorrect) {
            const question = Question.getQuestionById(this.questionId);
            const team = Team.getTeam(answer.teamId);
            team.increaseScore(question.score);
          }
          return answer;
        });
      }
    });
  }
}

function buildAnswer(result) {
  return new Answer(result.id,
    result.answer,
    result.gameId,
    result.teamId,
    result.isCorrect);
}

module.exports = Answer;
