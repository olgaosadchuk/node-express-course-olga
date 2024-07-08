// Import the express module
const express = require('express');

// Import the cookie-parser module
const cookieParser = require('cookie-parser');

// Import the products and people data
const { products, people } = require("./data");

// Create an instance of the express application
const app = express();

// Middleware function to log request details
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

// Middleware to serve static files from the 'public' directory
app.use(express.static('./public'));

// Call the logger for all paths
app.use(logger);

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Auth middleware function
const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

// POST request for /logon
app.post('/logon', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }

  res.cookie('name', name);
  res.status(201).json({ success: true, message: `Hello, ${name}` });
});

// DELETE request for /logoff
app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ success: true, message: "User logged off" });
});

// GET request for /test with auth middleware
app.get('/test', auth, (req, res) => {
  res.status(200).json({ success: true, message: `Welcome, ${req.user}` });
});

// GET request for /api/v1/people
app.get('/api/v1/people', (req, res) => {
  res.json(people);
});

// POST request for /api/v1/people
app.post('/api/v1/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }

  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res.status(201).json({ success: true, name });
});

// GET request for /api/v1/people/:id
app.get('/api/v1/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find(p => p.id === id);
  
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});

// PUT request for /api/v1/people/:id
app.put('/api/v1/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const personIndex = people.findIndex(p => p.id === id);

  if (personIndex !== -1) {
    people[personIndex].name = name;
    res.json({ success: true, name });
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});

// DELETE request for /api/v1/people/:id
app.delete('/api/v1/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personIndex = people.findIndex(p => p.id === id);

  if (personIndex !== -1) {
    people.splice(personIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});

// Route handler for /api/v1/test to return JSON
app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" });
});

// Route handler for /api/v1/products to return the products array
app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

// Route handler for /api/v1/products/:productID to return the product with the specified ID
app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found." });
  }
});

// Route handler for /api/v1/query to handle search, regex, and maxPrice functionality
app.get('/api/v1/query', (req, res) => {
  const { search, regex, maxPrice, limit } = req.query;
  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (regex) {
    const regexPattern = new RegExp(regex, 'i');
    filteredProducts = filteredProducts.filter((product) =>
      regexPattern.test(product.name)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) =>
      product.price <= parseFloat(maxPrice)
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  res.json(filteredProducts);
});

// Handle 404 - Page Not Found
app.all('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Console log to indicate the script is running
console.log('Express Tutorial');