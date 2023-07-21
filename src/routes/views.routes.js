import { Router } from "express";
import ProductManager from "../index.js";


const router = Router();

router.get("/realtimeproducts", (req, res) => {
  res.render('realTimeProducts');
});

router.get("/home", async (req, res) => {

  const prods = new ProductManager('products.json')

  let productos = await prods.getProducts()
  res.render('home', { productos });
});

export default router;