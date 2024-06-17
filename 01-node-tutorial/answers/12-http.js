const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to our home page');
  } else if (req.url === '/about') {
    res.end('Here is our short history');
  } else {
    res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href="/">back home</a>
    `);
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// 1. Run the file using Node.js
// 2. Open your web browser and navigate to http://localhost:3000. You should see the "Welcome to our home page" message.
// 3. Navigate to http://localhost:3000/about to see the "Here is our short history" message.
// 4. Navigate to any other URL (e.g., http://localhost:3000/contact) to see the error message.