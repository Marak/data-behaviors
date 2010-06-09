var sys = require("sys"), 
    dom = require('./lib/jsdom/lib/level1/core').dom.level1.core,
    fs = require("fs"),
    haml = require('./lib/haml-js/lib/haml')
    ;


var window = require("./lib/jsdom/lib/browser").windowAugmentation(dom);
var document = window.document;
var location = window.location;
var navigator = window.navigator = { userAgent: "node-js" };
global.window = window;


var jquery =  fs.readFileSync('./lib/jquery.js', encoding='utf8');
var JUP =  fs.readFileSync('./lib/JUP.js', encoding='utf8');
var template = fs.readFileSync('./test.haml');

global.window.document.compareDocumentPosition = function() {};
dom.Node.prototype.addEventListener = window.addEventListener = window.document.addEventListener = function() {};

try {
  eval(jquery.toString());
} catch (e) {
  sys.puts(sys.inspect(e.stack, true));
}


try {
  eval(JUP.toString());
} catch (e) {
  sys.puts(sys.inspect(e.stack, true));
}

  // Doing this requires you setup a parser, easiest way is to put node-htmlparser.js into 
  // ~/.node_libraries/

window.jQuery(document.body).append("<div class='testing'>Hello World, It works!</div>");
sys.puts(window.jQuery(".testing").text());

sys.puts(window.JUP.parseDOM());
  
sys.puts(template);