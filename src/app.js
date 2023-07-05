import express from "express";
import ProductManager from "./index.js";

const app = express();
const newProductManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
 const limitNumber = req.query.limit;
 const limit = Number(limitNumber);

 const getProducts = await newProductManager.getProducts();
 let arrayProducts;

 if (limit) {
  arrayProducts = getProducts.slice(0, limit);
 } else {
  arrayProducts = getProducts;
 }

 res.send(arrayProducts);
});

app.get("/products/:id", async (req, res) => {
 const { id } = req.params;
 const getProductsById = await newProductManager.getProductById(id);
 let response;
 if (getProductsById == undefined) {
  response = "No existe ese producto";
 } else {
  response = getProductsById;
 }
 return res.send(response);
});

app.listen(8080, () => {
 console.log("Servidor 8080");
});
