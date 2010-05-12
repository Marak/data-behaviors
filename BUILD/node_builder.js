/* 
    MAML node.js BUILD script
    Marak Squires,  May 2010
    running this file in node.js will generate a new version of the MAML library 

*/

var fs = require('fs');
var sys = require('sys');
var mustache = require('./lib/mustache');

sys.puts('starting BUILD script');

// initialize variables that will store our generated code
var docs = '';
var code = {};

// load main.js 
code.main = fs.readFileSync('./main.js', encoding='utf8');

code.com = '';
code.behave = '';
code.views = '';

/************************ GENERATE COMPONENTS ***************************/
  sys.puts('generating components.....');

  docs += "<h1>components</h1>";
  docs += "<ul>";

  // read com directory and get all components
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
  sys.puts('generated components successfully!');
/************************ END GENERATE COMPONENTS ***********************/

/************************ GENERATE BEHAVIORS ***************************/
  sys.puts('generating behaviors.....');
  docs += "<h1>behaviors</h1>";
  docs += "<ul>";

  // read behave directory and grab all behaviors
  var behaves = paths('../behave');

  for(var behave in behaves){

    if(behaves[behave].search('.js') > 0){ // if this is a file
      var fileContents = fs.readFileSync(behaves[behave], encoding='utf8');
      docs += "<li>"+fileFilter(behaves[behave])+"</li>";
      code.behave += 'MR' + '.' + fileFilter(behaves[behave]) + ' = function(options){' + fileContents + '};' + '\n\n';
    }
    else{
      docs += "<li>"+fileFilter(behaves[behave])+"</li>";
      code.behave += 'MR' + '.' + fileFilter(behaves[behave]) + ' = {};' + '\n\n';
    }

  }
  docs += "</ul>";
  sys.puts('generated behaviors successfully!');
/************************ END GENERATE BEHAVIORS ***************************/

/************************ GENERATE VIEWS ***************************/
  sys.puts('generating views.....');
  // read through views directory and get all views
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
  sys.puts('generated views successfully!');
/************************ END GENERATE VIEWS ***********************/

/************************ BUNDLE GENERATED CODE ********************/

  // perform a mustache replace on main to insert in sub components
  var output = mustache.Mustache.to_html(code.main, {"coms":code.com, "behaves":code.behave, "views":code.views});

  fs.writeFile('../mustache-rides.js', output, function() {
    sys.puts("MAML.js generated successfully!");
  });

  fs.writeFile('../ReadMe.md', docs, function() {
    sys.puts("documentation generated successfully!");
  });

/*********************** END BUNDLING OF GENERATED CODE ************/

/*********************** BUILD HELPER METHODS *********************/

  // Recursively traverse a hierarchy, returning a list of all relevant .js files.
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

/*********************** END BUILD HELPER METHODS ****************/

