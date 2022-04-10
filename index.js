//imports
const express = require("express");
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper");
const productValidate = require("./middleware/product-validation");
const productLogger = require("./middleware/product-logger");
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Endpoints

//GET products
//http://localhost:5005/api/products
app.get("/api/products", (req, res) => {
  const products = repoContext.products.findAllProducts();
  console.log(req.headers);
  return res.send(products);
});

//GET products by ID
//http://localhost:5005/api/products/:id
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = repoContext.products.findProductById(id);
  return res.send(product);
});

//POST new product
//http://localhost:5005/api/products
app.post("/api/products", [productLogger, productValidate], (req, res) => {
  const newProduct = req.body;
  const addedProduct = repoContext.products.createProduct(newProduct);
  return res.status(201).send(addedProduct);
});

//PUT products by ID
//http://localhost:5005/api/products/:id
app.put("/api/products/:id", [productValidate], (req, res) => {
  const id = parseInt(req.params.id);
  const productPropertiesToModify = req.body;
  const product = repoContext.products.updateProduct(
    id,
    productPropertiesToModify
  );
  return res.send(product);
});

//DELETE products by ID
//http://localhost:5005/api/products/:id
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = repoContext.products.deleteProduct(id);
  return res.send(product);
});

//Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server is running! on Port: ${PORT}`);
});
