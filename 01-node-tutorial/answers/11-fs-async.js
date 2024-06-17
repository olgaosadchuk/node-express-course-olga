const { readFile, writeFile } = require('fs');
const path = require('path');

const firstFilePath = path.join(__dirname, 'content', 'first.txt');
const secondFilePath = path.join(__dirname, 'content', 'second.txt');
const resultFilePath = path.join(__dirname, 'content', 'result-async.txt');

console.log('start');

readFile(firstFilePath, 'utf8', (err, result) => {
  if (err) {
    console.log('Error reading first.txt:', err);
    return;
  }
  const first = result;
  readFile(secondFilePath, 'utf8', (err, result) => {
    if (err) {
      console.log('Error reading second.txt:', err);
      return;
    }
    const second = result;
    writeFile(resultFilePath, `Here is the result : ${first}, ${second}\n`, (err) => {
      console.log('at point 1');
      if (err) {
        console.log('Error writing to result-async.txt:', err);
        return;
      }
      writeFile(resultFilePath, 'This is line 2\n', { flag: 'a' }, (err) => {
        console.log('at point 2');
        if (err) {
          console.log('Error appending to result-async.txt:', err);
          return;
        }
        writeFile(resultFilePath, 'This is line 3\n', { flag: 'a' }, (err) => {
          console.log('at point 3');
          if (err) {
            console.log('Error appending to result-async.txt:', err);
            return;
          }
          console.log('done with this task');
        });
      });
    });
  });
});

console.log('starting next task');
