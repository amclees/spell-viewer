// This is a Node.js-based utility to add classes to a spell description list given a spell class list.
var fs = require('fs');
var readline = require('readline');

var classReader = readline.createInterface({
  input: fs.createReadStream('spell-classes.txt')
});

var nameClasses = {};
classReader.on('line', function(line) {
  var split = line.replace(')', '').split('(');
  var name = split[0].trim().toLowerCase();
  var classes = split[1].split(', ').map(function(className) {
    var classNameTrimmed = className.trim();
    return classNameTrimmed[0].toUpperCase() + classNameTrimmed.slice(1);
  });
  nameClasses[name] = classes;
});

var reader = readline.createInterface({
  input: fs.createReadStream('spells.txt')
});

var lines = [];
var latestName = '';
var awaitingName = true;
reader.on('line', function(line) {
  if (awaitingName) {
    latestName = line.trim().toLowerCase();
    awaitingName = false;
  } else if (line.indexOf('Class: ') !== -1) {
    if (!nameClasses.hasOwnProperty(latestName)) {
      console.log('Missing list for name: ' + latestName);
    }
    lines.push('Class: ' + nameClasses[latestName].join(', '));
    return true;
  } else if (line === ''){
    awaitingName = true;
  }
  lines.push(line);
});

reader.on('close', function() {
  fs.writeFile('spells-with-classes.txt', lines.join('\n'), 'utf8', function() {
    console.log('Wrote generated spells with classes to spells-with-classes.txt.');
  });
});
