// enumerate through folders to generate actual mustache-rides.js file 

var fs = require('fs');
var sys = require('sys');
var mustache = require('./lib/mustache');

sys.puts('building');

// initialize variables that will store our generated code
var docs = '';
var code = {};

// load main.js 
code.main = fs.readFileSync('./main.js', encoding='utf8');

code.com = '';
code.behave = '';
code.views = '';

function fileFilter(txt){

  txt = txt.replace(/\.\.\//g, '');
  
  txt = txt.replace(/\//g, '.');

  txt = txt.replace(/\.js/, '');

  txt = txt.replace(/\.index/, '');
    
  return txt;
}

function mamlFilter(maml){
  
  maml = maml.replace(/\n/, '');
  
  return maml;
}

// read through com (components) directory and get all coms
docs += "<h1>components</h1>";
docs += "<ul>";

var coms = paths('../com');

for(var com in coms){
  
  if(coms[com].search('.js') > 0){ // if this is a file
    var fileContents = fs.readFileSync(coms[com], encoding='utf8');
    docs += "<li>"+fileFilter(coms[com])+"</li>";

    // read file contents and inject in the code 
    code.com += 'MR' + '.' + fileFilter(coms[com]) + ' = function(options){' + fileContents + '};' + '\n\n';
  }
  else{

    docs += "<li>"+fileFilter(coms[com])+"</li>";
    code.com += 'MR' + '.' + fileFilter(coms[com]) + ' = {};' + '\n\n';
    
  }

}
docs += "</ul>";


// read through views and get all views
var views = paths('../views');

docs += "<h1>views</h1>";

docs += "<ul>";

for(var view in views){
    docs += "<li>"+fileFilter(views[view])+"</li>";
    code.views += 'MR' + '.' + fileFilter(views[view]) + ' = {};' + '\n\n';

    if(views[view].search('.js') > 0){ // if this is a file
      var fileContents = fs.readFileSync(views[view], encoding='utf8');
      docs += "<li>"+fileFilter(views[view])+"</li>";

      // read file contents and inject in the code 
      code.views += 'MR' + '.' + fileFilter(views[view]) + ' = \'' + mamlFilter(fileContents) + '\';' + '\n\n';
    }
    else{

      docs += "<li>"+fileFilter(views[view])+"</li>";
      code.views += 'MR' + '.' + fileFilter(views[view]) + ' = {};' + '\n\n';

    }

}

docs += "</ul>";


docs += "<h1>behaviors</h1>";

var behaves = paths('../behave');

docs += "<ul>";

for(var behave in behaves){

  if(behaves[behave].search('.js') > 0){ // if this is a file

    var fileContents = fs.readFileSync(behaves[behave], encoding='utf8');

    docs += "<li>"+fileFilter(behaves[behave])+"</li>";
    // read file contents and inject in the code 
    code.behave += 'MR' + '.' + fileFilter(behaves[behave]) + ' = function(options){' + fileContents + '};' + '\n\n';

  }
  else{

    docs += "<li>"+fileFilter(behaves[behave])+"</li>";
    code.behave += 'MR' + '.' + fileFilter(behaves[behave]) + ' = {};' + '\n\n';


  }

}
docs += "</ul>";

var output = code.main;
// perform a mustache replace on main to insert in sub components

//output = mustache.to_html(code, {});
output = mustache.Mustache.to_html(output, {"coms":code.com, "behaves":code.behave, "views":code.views});

//code.com + code.behave;
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