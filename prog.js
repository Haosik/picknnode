var fs = require('fs');
// var path = require('path');

const neededRandom = 5;

let initialList =
  fs.readFileSync(__dirname + '/assets/initial.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
  }) ||
  fs.readFileSync(__dirname + '/assets/newInitial.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
const initialArray = initialList.split('\n');
const initialLength = initialArray.length;

let usedRandom = fs.readFileSync(__dirname + '/assets/initial.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
});
usedRandomArray = usedRandom.split('\n') || [];

//check if we have enough words in file left
if (initialLength >= neededRandom) {
  const randomList = [];

  for (let i = 0; i < neededRandom; i++) {
    const randomIndex = Math.floor(Math.random() * initialLength);
    if (!initialArray.includes(randomList[randomIndex])) {
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

  fs.writeFile(__dirname + '/assets/newInitial' + dateInSec + '.txt', newInitial, function(err) {
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
