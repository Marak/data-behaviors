/* 
    running this file in node.js will generate a new version of the behave library 
*/

var fs = require('fs');
var sys = require('sys');
var mustache = require('./lib/mustache');
var eyes = require ('./lib/eyes');
var colors = require('./lib/colors');
var     haml = require('./lib/haml-js/lib/haml');
/* JSDOM STUFF
var dom = require('./lib/jsdom/lib/level1/core').dom.level1.core,


var window = require("./lib/jsdom/lib/browser").windowAugmentation(dom);
var document = window.document;
var location = window.location;
var navigator = window.navigator = { userAgent: "node-js" };
global.window = window;

var jquery =  fs.readFileSync('./BUILD/lib/jquery.js', encoding='utf8');
var JUP =  fs.readFileSync('./BUILD/lib/JUP.js', encoding='utf8');


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


*/


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

  // setup the docs object
  docs.com = '';
  docs.behave = '';

  /************************ GENERATE BEHAVIORS ***************************/

    // we should update the way the documentation is generated here. the current UL that gets generated is only one level deep.....
    // would be great if we could use behave.list.simple, but im not sure of the best approach of calling the behavior server-side before the library is actually generated....
   
    sys.puts("BUILD ".yellow + 'generating behaviors...');
    docs.behave += "<ul>";

    // read behave directory and grab all behaviors
    var behaves = paths('./BUILD/behave');
    behaves.sort();

    // the follow FOR IN loops can be refactored to reduce size and complexity
    // im leaving the old logic in here for creating the "behave" bundle object in case i need to revert back, or make a modfication
    // lets try to purge this code sometime before release
    for(var behave in behaves){

      if(behaves[behave].search('.js') > 0){ // if this is a file
        var fileContents = fs.readFileSync(behaves[behave], encoding='utf8');
        //docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
        //code.behave += (fileFilter(behaves[behave]) + ' = function(options){' + fileContents  + '\n\n};\n\n');
      }
      else{
        docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
        
        // we are going to check if there a root level index.js file in this folder, if so we want to use that logic as the base for this behavior
        // if not, we are going to stub out the method to do nothing, it is assumed if there is no index.js in the folder, 
        // that the folder has subfolders that will eventually contain an index.js file
        try{
          var stat = fs.statSync(behaves[behave] + '/index.js');
          if(stat.isFile()){
            var fileContents = fs.readFileSync((behaves[behave] + '/index.js'), encoding='utf8');
          }
          code.behave += (fileFilter(behaves[behave]) + ' = function(options){'+fileContents+'};' + '\n\n'); // add check for root level index file
        }
        catch(err){
          code.behave += (fileFilter(behaves[behave]) + ' = function(options){return "this is the container for the '+ fileFilter(behaves[behave])+' behavior, inspecting this object will reveal the child behaviors and their respective controllers.";};' + '\n\n'); 
          // add check for root level index file
        }
      }
    }
    docs.behave += "</ul>";
    sys.puts("BUILD ".yellow +'generated behaviors successfully!');

  /************************ END GENERATE BEHAVIORS ***************************/

  /************************ BUNDLE GENERATED CODE ********************/

    // lets determine if the code bundle we have generated has not failed
    try{
      var x = eval(behaveLibrary);
    }
    catch(err){
      sys.puts('error, build failing');
    }
 
    // perform a mustache replace on main to insert in sub components
    var behaveLibrary = mustache.Mustache.to_html(code.main, {"coms":code.com, "behaves":code.behave});
    var documentation = docs.main + docs.behave + docs.com;

    fs.writeFileSync('./behave.js', behaveLibrary);
    sys.puts("BUILD ".yellow + 'behave.js written!');
    
    fs.writeFileSync('./examples/js/behave.js', behaveLibrary);
    sys.puts("BUILD ".yellow + '/examples/js/behave.js written!');
    
    fs.writeFileSync('./ReadMe.md', documentation);
    sys.puts("BUILD ".yellow + 'ReadMe.md written!');

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
      txt = txt.replace(/BUILD./, '');
      txt = txt.replace(/behave/, 'behave.behaviors');

      return txt;
    }

    function mamlFilter(maml){
      maml = maml.replace(/\n/, '');
      return maml;
    }

  /*********************** END BUILD HELPER METHODS ****************/


};


