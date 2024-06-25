const { createReadStream } = require('fs');
const path = require('path');

// Path to the big.txt file
const filePath = path.resolve(__dirname, '../content/big.txt');

// Create a read stream with encoding 'utf8' and highWaterMark of 200 bytes
const readStream = createReadStream(filePath, {
  encoding: 'utf8',
  highWaterMark: 200,
});

// Initialize a counter to keep track of the number of chunks
let chunkCount = 0;

// Handle the 'data' event
readStream.on('data', (chunk) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount}: ${chunk}`);
});

// Handle the 'end' event
readStream.on('end', () => {
  console.log(`Stream ended. Total chunks received: ${chunkCount}`);
});

// Handle the 'error' event
readStream.on('error', (error) => {
  console.error('An error occurred:', error);
});