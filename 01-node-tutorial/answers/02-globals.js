// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed


// Print the directory name
console.log('__dirname:', __dirname);
// Print the file name
console.log('__filename:', __filename);

// Print the custom environment variable
console.log('process.env.MY_VAR:', process.env.MY_VAR);

// Print some other global variables
console.log('process.platform:', process.platform);
console.log('process.version:', process.version);

// Set an interval to print "hello world" every second
setInterval(() => {
  console.log('hello world');
}, 1000);