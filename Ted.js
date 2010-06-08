// Ted is the BUILD manager. he is a quick and dirty continious intergration server for building the data-behaviors library 
// run this script once when you start up development and any changes made to the library
// will trigger a BUILD process to happen (tests, generate documentation, generate code bundles)

var fs = require('fs');
var sys = require('sys');
var eyes = require('./BUILD/lib/eyes');
var build = require('./BUILD/BUILD');

// the paths method will return an array of files and directories (children) of whatever path is sent as an argument
var project = paths('./BUILD');

eyes.inspect('Ted is up and running. he\'s watching over '+ project.length +' files and directories in the BUILD directory');
eyes.inspect('If you make any modifications to the BUILD directory, Ted will get mad and rebuild.');

// watch the directory for changes, in the handler for directory watching we will perform our build process
watchDir(project);

// watches an array of files and directories and fires the "fileChange" handler
function watchDir(dir){
  for(var file in dir){
    var theFile = dir[file];
    (function(theFile){
      fs.watchFile(theFile, function (curr,prev) {
        if(new(Date)(curr.mtime).valueOf() === new(Date)(prev.mtime).valueOf()) { 
          return; 
        }
        else{
          fileChange(theFile);
        }
      });
    })(theFile);
  }
}

// unwatches an array of files and directories
function unwatchDir(dir){
  for(var file in dir){
    var theFile = dir[file];
    fs.unwatchFile(theFile);
  }
}

// event handler for changed detected by the directory watcher
function fileChange(file){
  // unwatch all files or else we can end up in an infinite loop
  unwatchDir(project);
  eyes.inspect(file, 'Change detected');
  eyes.inspect('Triggering build!');
  // run the build process
  build.build();
  sys.puts('Build complete!');
  
  // rebuild the project files / directories array (since we might have new files now)
  var project = paths('./BUILD'); 
  
  // rewatch the BUILD directory
  watchDir(project);
}

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