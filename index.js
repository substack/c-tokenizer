var Tokenizer = require('tokenizer')
var rules = require('./rules.js')

module.exports = function (cb) {
  var t = new Tokenizer(cb)
  rules.forEach(function (r) {
    t.addRule(r.regex, r.type)
  })
  return t
}
