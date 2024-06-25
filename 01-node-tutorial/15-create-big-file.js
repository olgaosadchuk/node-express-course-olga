//const { writeFileSync } = require('fs')
//for (let i = 0; i < 10000; i++) {
//  writeFileSync('./content/big.txt', `hello world ${i}\n`, { flag: 'a' })
//}

const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');

// Ensure the content directory exists
const contentDir = path.resolve(__dirname, 'content');
mkdirSync(contentDir, { recursive: true });

for (let i = 0; i < 10000; i++) {
  writeFileSync(path.join(contentDir, 'big.txt'), `hello world ${i}\n`, { flag: 'a' });
}
