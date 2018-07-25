'use strict';
var fs = require('fs');

const neededRandom = 5;

// reading Newinitial.txt or it it's absent - initial.txt
let initialList = '';
try {
  initialList = fs.readFileSync(__dirname + '/assets/newInitial.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
} catch (err) {
  initialList = fs.readFileSync(__dirname + '/assets/initial.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
}
// Making initial Array
const initialListArray = initialList.split('\n');
const initialArray = initialList.split('\n');
const initialLength = initialArray.length;

let usedRandom = '';
let usedRandomArray = [];
console.log(123);
try {
  usedRandom = fs.readFileSync(__dirname + '/assets/usedRandom.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
} catch (err) {
  return false
}
console.log('used random', usedRandomArray);
usedRandomArray = usedRandom.split('\n');

let randomList = [];

//check if we have enough words in file left
if (initialLength >= neededRandom) {
  for (let i = 0; i < neededRandom; i++) {
    let randomIndex = Math.floor(Math.random() * initialLength);
    if (
      !randomList[randomIndex].includes(initialArray[randomIndex]) &&
      !usedRandomArray.includes(initialArray[randomIndex])
    ) {
      randomList.push(initialArray[randomIndex]);
      usedRandomArray.push(initialArray[randomIndex]);
    }
  }

  const randomListString = randomList.join('\n');

  let newInitial = initialArray.map(item => {
    if (!randomList.includes(item)) {
      return item;
    }
  });
  newInitial = newInitial.join('\n');

  const dateInSec = parseInt(Date.now() / 1000, 10);

  fs.writeFile(__dirname + '/assets/newRandom' + dateInSec + '.txt', randomListString, function(
    err
  ) {
    if (err) {
      return console.log(err);
    }
  });

  fs.writeFile(__dirname + '/assets/newInitial.txt', newInitial, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  fs.writeFile(__dirname + '/assets/usedRandom.txt', usedRandomArray, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}
