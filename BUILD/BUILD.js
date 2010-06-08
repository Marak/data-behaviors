/* 
    running this file in node.js will generate a new version of the behave library 

*/

var fs = require('fs');
var sys = require('sys');
var mustache = require('./lib/mustache');
var eyes = require ('./lib/eyes');
var colors = require('./lib/colors');

exports.build = function(){

  // initialize variables that will store our generated code
  var docs = {};
  var code = {};

  // read in the the main.js file as our main boilerplate code 
  code.main = fs.readFileSync('./BUILD/main.js', encoding='utf8');

  // read in the the docs.js file as our main documentation boilerplate code 
  docs.main = fs.readFileSync('./BUILD/docs.js', encoding='utf8');


  // setup the code object 
  code.com = '';
  code.behave = '';
  code.views = '';

  // setup the docs object
  docs.com = '';
  docs.behave = '';
  docs.views = '';


  /************************ GENERATE BEHAVIORS ***************************/

    // we should update the way the documentation is generated here. the current UL that gets generated is only one level deep.....
    // would be great if we could use behave.list.simple, but im not sure of the best approach of calling the behavior server-side before the library is actually generated....
   
    sys.puts("BUILD ".yellow + 'generating behaviors...');
    docs.behave += "<ul>";

    // read behave directory and grab all behaviors
    var behaves = paths('./BUILD/behave');

    //sys.puts(JSON.stringify(behaves));

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
    sys.puts("BUILD ".yellow +'generated behaviors successfully!');

  /************************ END GENERATE BEHAVIORS ***************************/

  /************************ GENERATE VIEWS ***************************/
    sys.puts("BUILD ".yellow + 'generating views.....');
    // read through views directory and get all views
    var views = paths('./BUILD/views');

    docs.views += "<h1>views</h1>";
    docs.views += "<ul>";

    for(var view in views){
      if(views[view].search('.js') > 0){ // if this is a file
        var fileContents = fs.readFileSync(views[view], encoding='utf8');
        //docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
        code.views += (fileFilter(views[view]) + ' = function(options){' + fileContents + '};' + '\n\n');
      }
      else{
        docs.views += "<li>"+docFilter(views[view])+"</li>";

        code.views += (fileFilter(views[view]) + ' = function(){return views.behaviors.view();};' + '\n\n');
      }
    }

    docs.views += "</ul>";
    sys.puts("BUILD ".yellow + 'generated views successfully!');
  /************************ END GENERATE VIEWS ***********************/

  /************************ BUNDLE GENERATED CODE ********************/

    // perform a mustache replace on main to insert in sub components
    var behaveLibrary = mustache.Mustache.to_html(code.main, {"coms":code.com, "behaves":code.behave, "views":code.views});
    var documentation = docs.main + docs.behave + docs.com + docs.views;

    fs.writeFileSync('./behave.js', behaveLibrary);
    sys.puts("BUILD ".yellow + 'behave.js written!');
    
    fs.writeFileSync('./examples/js/behave.js', behaveLibrary);
    sys.puts("BUILD ".yellow + '/examples/js/behave.js written!');
    
    fs.writeFileSync('./ReadMe.md', documentation);
    sys.puts("BUILD ".yellow + 'ReadMe.md written!');

  /*********************** END BUNDLING OF GENERATED CODE ************/

};


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
    txt = txt.replace(/BUILD./, '');
    
    return txt;
  }

  function mamlFilter(maml){
    maml = maml.replace(/\n/, '');
    return maml;
  }

/*********************** END BUILD HELPER METHODS ****************/

