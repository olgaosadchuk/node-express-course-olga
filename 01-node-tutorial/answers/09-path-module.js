const path = require('path')

console.log('Path Separator:', path.sep)

const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log('Joined Path:', filePath)

const base = path.basename(filePath)
console.log('Base Name:', base)

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log('Absolute Path:', absolute)
