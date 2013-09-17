var Tokenizer = require('tokenizer');
var t = new Tokenizer(function (src, target) {
    console.log(target.type + ' => ' + JSON.stringify(src));
});

t.addRule(/^\/\*([^*]|\*(?!\/))*\*\/$/, 'area comment');
t.addRule(/^\/\*([^*]|\*(?!\/))*\*?$/, 'area comment continue');

t.addRule(/^\/\/[^\n]*$/, 'line comment');

t.addRule(/^"([^"\n]|\\")*"?$/, 'quote');
//t.addRule(/^"([^"\n]|\\")*(!?")/, 'quote continue');

t.addRule(token('#define'), 'define');
t.addRule(token('#include'), 'include');
t.addRule(token('#require'), 'require');
t.addRule(token('#export='), 'export=');
t.addRule(token('#export'), 'export');

t.addRule(/^\($/, 'open paren');
t.addRule(/^\)$/, 'close paren');
t.addRule(/^\[$/, 'open square');
t.addRule(/^\]$/, 'close square');
t.addRule(/^{$/, 'open curly');
t.addRule(/^}$/, 'close curly');

t.addRule(/^([-<>~!%^&*\/+=|.,:;]|<<|>>|\*\*|\|\||&&|--|\+\+|[-+*|&%\/=]=)$/, 'operator');
t.addRule(/^<[^>\n]*>$/, 'angle quote'); // for c++ templates

t.addRule(/^([_A-Za-z]\w*)$/, 'identifier');

t.addRule(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, 'number');
t.addRule(/^(\s+)$/, 'whitespace');

process.stdin.pipe(t);

function token (s) {
    return re('^' + allPrefixes(s) + '$');
}

function allPrefixes (s) {
    return s.split('').map(function (c) {
        return '(' + c;
    }).join('') + Array(s.length + 1).join(')?');
}

function re (s) { return RegExp(s) }
