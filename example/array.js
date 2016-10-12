var tokenize = require('../array')
var src = process.argv[2]
var tokens = tokenize(src)
tokesn.forEach(function (t) {
  console.log(JSON.stringify(t))
})
