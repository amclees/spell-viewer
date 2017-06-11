// This is a Node.js-based utility to convert a text file of spells to JSON
var fs = require('fs');
var readline = require('readline');

var reader = readline.createInterface({
  input: fs.createReadStream('spells.txt')
});

var words = {};

var currentWord = {};
var currentName = '';
var state = 0;
var currentLineNumber = 0;
var lastLineBreak = false;
/**
The parsing is done in a finite state machine.
The following are the states by what they are waiting for:
0 - Spell name
1 - Spell level text & school
2 - Casting time
3 - Range
4 - Components
5 - Duration
6 - Class
7 - Description or new spell

Lines consisting of \n (\n only) are replaced with a newline
*/
reader.on('line', function(line) {
  if (line === '' || line === 'END') {
    words[currentName] = currentWord;
    currentWord = {};
    currentName = '';
    state = 0;
  } else if (line === '-' || line.indexOf('//') === 0) {
    // Is a spacer/comment
  } else {
    switch (state) {
      case 0:
        currentName = line;
        state++;
        break;
      case 1:
        // TODO: Ritual support
        if (line.indexOf('cantrip') !== -1) {
          currentWord.level = 0;
          currentWord.school = line.split(' ')[0];
        } else if (line.indexOf('level') === -1) {
          console.log('Could not read level and school on line ' + currentLineNumber + ' from: ' + line);
          currentWord.level = -1;
          currentWord.school = 'None';
        } else {
          currentWord.level = line[0];
          var rawSchool = line.split(' ')[1];
          currentWord.school = rawSchool[0].toUpperCase() + rawSchool.slice(1);
        }
        state++;
        break;
      case 2:
        currentWord.casting_time = readTagged(line, 'Casting Time', currentLineNumber);
        state++;
        break;
      case 3:
        currentWord.range = readTagged(line, 'Range', currentLineNumber);
        state++;
        break;
      case 4:
        currentWord.components = readTagged(line, 'Components', currentLineNumber);
        state++;
        break;
      case 5:
        currentWord.duration = readTagged(line, 'Duration', currentLineNumber);
        state++;
        break;
      case 6:
        currentWord.class = readTagged(line, 'Class', currentLineNumber).split(', ');
        currentWord.description = '';
        state++;
        break;
      case 7:
        if (line === '\\n') {
          currentWord.description += '\n\n';
          lastLineBreak = true;
          break;
        } else if (currentWord.description !== '') {
          if (!lastLineBreak) {
            currentWord.description += ' ';
          }
        }
        currentWord.description += line;
        lastLineBreak = false;
        break;
    }
  }
  currentLineNumber++;
});

reader.on('close', function() {
  fs.writeFile('spells.json', JSON.stringify(words), 'utf8', function() {
    console.log('Wrote generated JSON to spells.json.');
  });
});

function readTagged(line, tag, lineNumber) {
  if (lineNumber === undefined) {
    lineNumber = -1;
  }
  var parts = line.split(': ');
  if (parts.length < 2 || parts[0].toLowerCase() !== tag.toLowerCase()) {
    console.log('Could not read tag ' + tag + ' on line ' + lineNumber + ' from: ' + line);
    return '';
  }
  return parts.slice(1).join(': ');
}
