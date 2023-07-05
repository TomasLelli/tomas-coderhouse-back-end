import ProductManager from "./src/index.js";

const newProductManager = new ProductManager("./products.json");
newProductManager.addProducts(
 "Nuevo producto",
 "Descripción",
 10.99,
 "imagen.jpg",
 "ABCPerro454",
 10
);

const products = await newProductManager.getProductById(2);
console.log(products);

const deleteProd = await newProductManager.deleteProducts(3)
console.log(deleteProd);
/* newProductManager.deleteProducts("ABCPerro44"); */
/* console.log(newProductManager.addProduct("mate", 230, "/api", "abc1234", 3));
console.log(newProductManager.getProductById("abc12444"));
console.log();
 */
