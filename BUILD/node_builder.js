
// enumerate through folders to generate actual mustache-rides.js file 


var fs = require('fs');
var sys = require('sys');

sys.puts('building');

var docs = '';


var code = {};

code.base += 'var MR = {};';
code.bootstrap = 'MR.bootstrap = {};';

code.com = '';
code.behave = '';


function fileFilter(txt){

  txt = txt.replace(/\.\.\//g, '');
  
  txt = txt.replace(/\//g, '.');

  txt = txt.replace(/\.js/, '');

  txt = txt.replace(/\.index/, '');
    
  return txt;
}


// read through com (components) directory and get all coms

docs += "<h1>components</h1>";
docs += "<ul>";

var coms = paths('../com');

for(var com in coms){
  
  // if we were going to use asyc loading we would start everything as null
    //code.com += 'MR' + '.' + filter(coms[com]) + ' = null;' + '\n\n';
  
  // include all the code in the first request, bundled together
  
  //sys.puts(coms[com]);
  
  if(coms[com].search('.js') > 0){ // if this is a file
  
    var fileContents = fs.readFileSync(coms[com], encoding='utf8');

    docs += "<li>"+fileFilter(coms[com])+"</li>";
    // read file contents and inject in the code 
    code.com += 'MR' + '.' + fileFilter(coms[com]) + ' = function(options){' + fileContents + '};' + '\n\n';
    
  }
  else{
    
  }

}
docs += "</ul>";


docs += "<h1>behaviors</h1>";

var behaves = paths('../behave');

for(var behave in behaves){
  code.behave += behaves[behave]; 
//  sys.puts();
}


var output = code.com + code.base;
sys.puts(output);

fs.writeFile('../mustache-rides.js', output, function() {
  sys.puts("mustache-rides generated!");
});

fs.writeFile('../ReadMe.md', docs, function() {
  sys.puts("documentation generated!");
});


//
// Recursively traverse a hierarchy, returning
// a list of all relevant .js files.
//
function paths(dir) {
    var paths = [];

    try { fs.statSync(dir) }
    catch (e) { return [] }

    (function traverse(dir, stack) {
        stack.push(dir);
        fs.readdirSync(stack.join('/')).forEach(function (file) {
            var path = stack.concat([file]).join('/'),
                stat = fs.statSync(path);

            if (file[0] == '.' || file === 'vendor') {
                return;
            } else if (stat.isFile() && /\.js$/.test(file)) {
                paths.push(path);
            } else if (stat.isDirectory()) {
                paths.push(path);
                traverse(file, stack);
            }
        });
        stack.pop();
    })(dir || '.', []);

    return paths;
}