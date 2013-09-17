var Tokenizer = require('tokenizer');
var t = new Tokenizer(function (src, target) {
    console.log(target.type + ' => ' + JSON.stringify(src));
});

t.addRule(/^\/\*([^*]|\*(?!\/))*\*\/$/, 'area comment');
t.addRule(/^\/\*([^*]|\*(?!\/))*\*?$/, 'area comment continue');

t.addRule(/^\/\/[^\n]*$/, 'line comment');

t.addRule(/^"([^"\n]|\\")*"$/, 'quote');
t.addRule(/^"([^"\n]|\\")*/, 'quote continue');

t.addRule(/^#define$/, 'define'); // for now...
t.addRule(/^#include\s+(?:"((?:[^"]|\\")*)"|<([^>]+)>)$/, 'include');
t.addRule(/^#include[^\n]*$/, 'include continue');
t.addRule(/^#require\s+(?:"((?:[^"]|\\")*)|<([^>]+)>)"\s+as\s+(\w+)$/, 'require');
t.addRule(/^#require[^\n]*$/, 'require continue');
t.addRule(/^#export(=\s*|\s+)(\w+\s*)?$/, 'export');
t.addRule(/^#export\b[^\n]*$/, 'export continue');

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
