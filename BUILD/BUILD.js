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

/************************ GENERATE COMPONENTS ***************************/
  sys.puts('generating components.....');

  docs.com += "<h1>components</h1>";


  
  docs.com += "<ul>";

  // read com directory and get all components
  var coms = paths('./com');

  for(var com in coms){
    if(coms[com].search('.js') > 0){ // if this is a file
      var fileContents = fs.readFileSync(coms[com], encoding='utf8');
      docs.com += "<li>"+docFilter(coms[com])+"</li>";

      // read file contents and inject in the code 
      code.com += 'MR' + '.' + fileFilter(coms[com]) + ' = function(options){' + fileContents + '};' + '\n\n';
    }
    else{
      //docs.com += "<li>"+docFilter(coms[com])+"</li>";
      code.com += 'MR' + '.' + fileFilter(coms[com]) + ' = {};' + '\n\n';
    }
  }


  docs.com += "</ul>";



  sys.puts('generated components successfully!');
/************************ END GENERATE COMPONENTS ***********************/

/************************ GENERATE BEHAVIORS ***************************/
  sys.puts('generating behaviors.....');
  docs.behave += "<h1>behaviors</h1>";
  docs.behave += "<ul>";

  // read behave directory and grab all behaviors
  var behaves = paths('./behave');

  for(var behave in behaves){

    if(behaves[behave].search('.js') > 0){ // if this is a file
      var fileContents = fs.readFileSync(behaves[behave], encoding='utf8');
      //docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
      code.behave += 'MR' + '.' + fileFilter(behaves[behave]) + ' = function(options){' + fileContents + '};' + '\n\n';
    }
    else{
      docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
      code.behave += 'MR' + '.' + fileFilter(behaves[behave]) + ' = {};' + '\n\n';
    }

  }
  docs.behave += "</ul>";
  sys.puts('generated behaviors successfully!');
/************************ END GENERATE BEHAVIORS ***************************/

/************************ GENERATE VIEWS ***************************/
  sys.puts('generating views.....');
  // read through views directory and get all views
  var views = paths('./views');

  docs.views += "<h1>views</h1>";
  docs.views += "<ul>";

  for(var view in views){
      docs.views += "<li>"+fileFilter(views[view])+"</li>";
      code.views += 'MR' + '.' + fileFilter(views[view]) + ' = {};' + '\n\n';
      if(views[view].search('.js') > 0){ // if this is a file
        var fileContents = fs.readFileSync(views[view], encoding='utf8');
        //docs.views += "<li>"+docFilter(views[view])+"</li>";

        // read file contents and inject in the code 
        code.views += 'MR' + '.' + fileFilter(views[view]) + ' = \'' + mamlFilter(fileContents) + '\';' + '\n\n';
      }
      else{
        docs.views += "<li>"+fileFilter(views[view])+"</li>";
        code.views += 'MR' + '.' + docFilter(views[view]) + ' = {};' + '\n\n';
      }
  }

  docs.views += "</ul>";
  sys.puts('generated views successfully!');
/************************ END GENERATE VIEWS ***********************/

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

