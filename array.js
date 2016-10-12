var rules = require('./rules.js')
var tokenizer = require('tokenizer-array')

module.exports = function (src) {
  return tokenizer(src, rules)
}
