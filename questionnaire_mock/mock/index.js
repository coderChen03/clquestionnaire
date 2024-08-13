const test = require("./test");
const question = require("./question");
const user = require('./user')
const stat = require('./stat')
const answer = require('./answer')

const MockList = [
  ...test,
  ...question,
  ...user,
  ...stat,
  ...answer
]

module.exports = MockList