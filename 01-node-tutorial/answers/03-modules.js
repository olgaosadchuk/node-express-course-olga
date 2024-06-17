// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')

sayHi(names.john)
sayHi(names.peter)
sayHi('Susan')

console.log('Single Person:', data.singlePerson);
console.log('Items:', data.items);

require('./07-mind-grenade')
