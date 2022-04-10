//imports
const express = require("express");
const app = express();
const repoContext = require("./repository/repository-wrapper");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  const addedProduct = repoContext.products.createProduct(newProduct);
  return res.status(201).send(addedProduct);
});

//DELETE products by ID
//http://localhost:5005/api/products/:id
app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = repoContext.products.deleteProduct(id)
    return res.send(product);
  });

//Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server is running! on Port: ${PORT}`);
});
