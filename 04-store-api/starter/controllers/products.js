const Product = require('../models/product');

// Function to get all products with static filtering
const getAllProductsStatic = async (req, res) => {
  // Find products with price greater than 30, sort by price, and select name and price fields
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  // Return the products and the number of hits
  res.status(200).json({ products, nbHits: products.length });
};

// Function to get all products with dynamic filtering based on query parameters
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // Add featured filter to the query object if present in the query parameters
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  // Add company filter to the query object if present in the query parameters
  if (company) {
    queryObject.company = company;
  }

  // Add name filter to the query object if present in the query parameters, using regex for case-insensitive matching
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // Process numeric filters if present in the query parameters
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // Create a query based on the query object
  let result = Product.find(queryObject);

  // Add sorting to the query if sort parameter is present, otherwise sort by creation date
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // Select specific fields if fields parameter is present
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // Implement pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // Execute the query and get the products
  const products = await result;

  // Return the products and the number of hits
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};