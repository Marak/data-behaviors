// Ted is the BUILD manager. he is a quick and dirty continious intergration server for building the data-behaviors library 
// run this script once when you start up development and any changes made to the library
// will trigger a BUILD process to happen (tests, generate documentation, generate code bundles)


var fs = require('fs');
var sys = require('sys');
var eyes = require('./BUILD/lib/eyes');
var build = require('./BUILD/BUILD');

var isBuilding = false; // if the build process is currently running

// get all child paths of BUILD directory
var project = paths('./BUILD');

watchDir(project);

// add the BUILD directory itself (checks for new children and deleted children)
//project.push('BUILD');


function watchDir(dir){
  for(var file in dir){
    var theFile = dir[file];
    (function(theFile){
      fs.watchFile(theFile, function (curr,prev) {
        fileChange(theFile);
      });
    })(theFile);
  }
}

function unwatchDir(dir){
  for(var file in dir){
    var theFile = dir[file];
    sys.puts('no longer watching ', theFile);
    fs.unwatchFile(theFile);
  }
}

function fileChange(file){
  unwatchDir(project);
  eyes.inspect(file, 'Change detected');
  eyes.inspect('Triggering build!');
  build.build();
  sys.puts('kinda complete');
  watchDir(project);
}


eyes.inspect('Ted is up and running. he\'s watching over '+ project.length +' files and directories in the BUILD directory');
eyes.inspect('If you make any modifications to the BUILD directory, Ted will get mad and rebuild.');

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