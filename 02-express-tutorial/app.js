// Import the express module
const express = require('express');

// Import the products data
const { products } = require("./data");

// Create an instance of the express application
const app = express();

// Middleware to serve static files from the 'public' directory
app.use(express.static('./public'));

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
