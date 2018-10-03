var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('itcont.txt');
var outstream = new stream();
var rl = readline.createInterface(instream, outstream);

//get line count for file
var lineCount = 0;

// create array list of names
var names = [];

// donations occurring in each month (date parsing library allowed)

// list of first names, and most common first name
var firstNames = [];
var dupeNames = {};

rl.on('line', function(line) {
  // process line here

  // increment line count
  lineCount++;

  // get all names
  var name = line.split('|')[7];
  names.push(name);

  // get all first halves of names
  var firstHalfOfName = name.split(', ')[1];
  // filter out middle initials
  var firstName = '';

  if (firstHalfOfName !== undefined && firstHalfOfName.includes(' ')) {
    firstName = firstHalfOfName.split(' ')[0];
  } else {
    firstNames.push(firstHalfOfName);
  }
  firstNames.push(firstHalfOfName);
});

rl.on('close', function() {
  // total line count
  console.log(lineCount);

  // names at various points in time
  console.log(names[432]);
  console.log(names[43243]);

  // most common first name
  firstNames.forEach(x => {
    dupeNames[x] = (dupeNames[x] || 0) + 1;
  });

  var sortedDupeNames = [];

  for (var name in dupeNames) {
    sortedDupeNames.push([name, dupeNames[name]]);
  }

  sortedDupeNames.sort((a, b) => {
    return a[1] - b[1];
  });

  console.log(sortedDupeNames[sortedDupeNames.length - 1]);
});
