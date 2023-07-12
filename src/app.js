import express from "express";
import ProductManager from "./index.js";
import ClassManager from "./cartManager.js";

const app = express();
app.use(express.json());
const newProductManager = new ProductManager("./products.json");
const newCartManager = new ClassManager("./carts.json");

app.get("/api/products", async (req, res) => {
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

app.get("/api/products/:id", async (req, res) => {
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

app.post('/api/products', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;

    const productStatus = status === undefined || status === "" ? true : status;

    const addProduct = await newProductManager.addProducts(title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        productStatus)

    return res.send(addProduct)
})

app.put('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    const newData = { ...req.body }
    const field = Object.keys(newData)[0];
    const value = newData[field];
    console.log(field, value);

    const editProduct = await newProductManager.updateProd(productId, field, value)

    return res.send(editProduct)
})

app.get('/api/carts/', async (req, res) => {
    const getCarts = await newCartManager.getCarts();
    return res.send(getCarts)
})

app.post('/api/carts', async (req, res) => {
    const addCart = await newCartManager.createCart()
    return res.send(addCart)
})

app.post('/api/carts/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const addProdInCart = await newCartManager.addProdToCart(cid, pid)

    console.log(addProdInCart);

})

app.listen(8080, () => {
    console.log("Servidor 8080");
});
