/* 
    running this file in node.js will generate a new version of the behave library 
*/

var fs = require('fs');
var sys = require('sys');
var mustache = require('./lib/mustache');
var eyes = require ('./lib/eyes');
var colors = require('./lib/colors');

var dom = require('./lib/jsdom/lib/level1/core').dom.level1.core,
    haml = require('./lib/haml-js/lib/haml');

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
        
        // before we can load the JUP view we have to check if there are other templates that take precedence
        
        // check if there is a HAML template available
        var hamlPath = views[view].replace('.js', '.haml');
        
        var found = false;
        // fs.statSync can't fail gracefully, hence the try / catch
        // we could also try to use the paths map for a lookup instead of statSync
        try{
          var hamlTemplate = fs.statSync(hamlPath);
          hamlTemplate = fs.readFileSync(hamlPath, encoding='utf8');
          found = true;
        }
        catch(err){
          // the googles do nothing
          //sys.puts(err);
        }
        
        if(found){
          sys.puts('found a haml template:'.green + hamlPath.grey + ' converting template to JUP...'.yellow);
          
          // parse haml template into html
          var htmlTemplate = haml.render(hamlTemplate);
          //sys.puts(htmlTemplate);
          // write some stuff to the body
          //window.jQuery(document.body).append(htmlTemplate.toString());
          
          // get that stuff back from the body
          //sys.puts(window.jQuery(document.body).html());
          // pass the nodes into JUP for parsing
          //var jupArray = window.JUP.parse(window.jQuery(document.body).html().toString());
          //sys.puts(JSON.stringify(jupArray));
          
          // assign the JUP array as the file contents (we have now bypassed the view.js file)
          //var fileContents = JSON.stringify(jupArray);
          var fileContents = htmlTemplate;
          
          // overwrite and update view.js for consistancy 
          fs.writeFileSync(views[view], fileContents);
          
          // generate a html partial for fun (and debuggings). don't use this partial please :-(
          fs.writeFileSync(views[view].replace('.js','.html'), htmlTemplate);
          
        }
        else{
          var fileContents = fs.readFileSync(views[view], encoding='utf8');
        }
        //hamlTemplate = fs.statSync(hamlTemplate);
        //sys.puts(hamlTemplate);
        
        
        //docs.behave += "<li>"+docFilter(behaves[behave])+"</li>";
        
        
        //sys.puts(views[view].search('presenter'));
        
        if(views[view].search('presenter') != -1){

          var str = ' = function(options){' + fileContents + '};'
          
        }
        else{
          if(fileContents[0]=='<'){
            var str = ' = function(options){return \'' + fileContents + '\'};'
          }
          else{
            var str = ' = function(options){return ' + fileContents + '};'
          }

          
        }
        
        code.views += (fileFilter(views[view]) + str + '\n\n');
      }
      else{
        docs.views += "<li>"+docFilter(views[view])+"</li>";
        
        // this looks broken, investigate this line
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
