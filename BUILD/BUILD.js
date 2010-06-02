/* 
    running this file in node.js will generate a new version of the MAML library 

*/

var fs = require('fs');
var sys = require('sys');
var mustache = require('./lib/mustache');

sys.puts('starting BUILD script');

// initialize variables that will store our generated code
var docs = {};
var code = {};

// read in the the main.js file as our main boilerplate code 
code.main = fs.readFileSync('./main.js', encoding='utf8');

// read in the the docs.js file as our main documentation boilerplate code 
docs.main = fs.readFileSync('./docs.js', encoding='utf8');


// setup the code object 
code.com = '';
code.behave = '';
code.views = '';

// setup the docs object
docs.com = '';
docs.behave = '';
docs.views = '';


/************************ GENERATE BEHAVIORS ***************************/
  sys.puts('generating behaviors.....');
  docs.behave += "<ul>";

  // read behave directory and grab all behaviors
  var behaves = paths('./behave');

  for(var behave in behaves){

    if(behaves[behave].search('.js') > 0){ // if this is a file
      var fileContents = fs.readFileSync(behaves[behave], encoding='utf8');
      //docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
      code.behave += (fileFilter(behaves[behave]) + ' = function(options){' + fileContents + '};' + '\n\n');
    }
    else{
      docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
      code.behave += (fileFilter(behaves[behave]) + ' = {};' + '\n\n');
    }

  }
  docs.behave += "</ul>";
  sys.puts('generated behaviors successfully!');
/************************ END GENERATE BEHAVIORS ***************************/

/************************ BUNDLE GENERATED CODE ********************/

  // perform a mustache replace on main to insert in sub components
  var mamlLibrary = mustache.Mustache.to_html(code.main, {"coms":code.com, "behaves":code.behave, "views":code.views});
  var documentation = docs.main + docs.behave + docs.com + docs.views;

  fs.writeFile('../MAML.js', mamlLibrary, function() {
    sys.puts("MAML.js generated successfully!");
  });

  fs.writeFile('../examples/js/MAML.js', mamlLibrary, function() {
    sys.puts("MAML.js generated successfully!");
  });

  fs.writeFile('../ReadMe.md', documentation, function() {
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

  function docFilter(txt){
    txt = txt.replace(/\.\//g, '');
    txt = txt.replace(/\//g, '.');
    txt = txt.replace(/\.js/, '');
    txt = txt.replace(/\.index/, '');
    txt = txt.replace(/com\./, '');
    txt = txt.replace(/behave\./, '');  
    txt = txt.replace(/views\./, '');
    
    // make link
    //txt = '<a href = "coms/' + txt + '">' + txt + '</a>';
      
    return txt;
  }


  function fileFilter(txt){
    txt = txt.replace(/\.\//g, '');
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

