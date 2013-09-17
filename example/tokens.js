var tokenize = require('../');
var t = tokenize(function (src, target) {
    console.log(target.type + ' => ' + JSON.stringify(src));
});
process.stdin.pipe(t);
