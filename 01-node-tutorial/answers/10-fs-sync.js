const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

console.log('start');

try {
  // Log current working directory
  console.log('Current working directory:', process.cwd());

  // Resolve absolute paths
  const firstPath = path.resolve(__dirname, 'content', 'first.txt');
  const secondPath = path.resolve(__dirname, 'content', 'second.txt');
  const resultPath = path.resolve(__dirname, 'content', 'result-sync.txt');

  // Read files
  const first = readFileSync(firstPath, 'utf8');
  const second = readFileSync(secondPath, 'utf8');

  // Write to file
  writeFileSync(
    resultPath,
    `Here is the result: ${first}, ${second}\n`,
    { flag: 'a' }
  );

  console.log('done with this task');
} catch (error) {
  console.error('Error reading or writing files:', error);
}

console.log('starting the next one');