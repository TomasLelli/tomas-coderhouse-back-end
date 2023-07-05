import fs from "fs";

export default class ProductManager {
 #path;

 constructor(path) {
  this.#path = path;
 }

 async addProducts(
  title,
  description,
  price,
  thumbnails,
  code,
  stock,
  category,
  status
 ) {
  const prods = await this.getProducts();

  const newProd = {
   id: prods.length ? prods[prods.length - 1].id + 1 : 1,
   title,
   description,
   price,
   thumbnails,
   code,
   stock,
   category,
   status,
  };

  const validar = await prods.some(
   (producto) => newProd.code === producto.code
  );

  if (validar) {
   console.error("El producto ya existe");
  } else {
   const updateProd = [...prods, newProd];

   await fs.promises.writeFile(this.#path, JSON.stringify(updateProd));
  }
 }

 async getProducts() {
  try {
   const prods = await fs.promises.readFile(this.#path, "utf-8");

   return JSON.parse(prods);
  } catch (err) {
   return [];
  }
 }

 async getProductById(idBuscar) {
  try {
   const prods = await this.getProducts();

   const buscarProdById = await prods.find((prod) => prod.id == idBuscar);

   return buscarProdById;
  } catch (err) {
   return [];
  }
 }

 async updateProd(id, prop, dato) {
  try {
   const prods = await this.getProducts();

   const buscarProd = await prods.filter((prod) => prod.id === id);

   buscarProd[0][prop] = dato;

   await fs.promises.writeFile(this.#path, JSON.stringify(prods));
  } catch (err) {
   console.error("No se pudo actualizar");
  }
 }

 async deleteProducts(idEliminar) {
  try {
   const prods = await this.getProducts();

   const eliminarProd = prods.filter((prod) => prod.id != idEliminar);

   await fs.promises.writeFile(this.#path, JSON.stringify(eliminarProd));

   return "Producto eliminado";
  } catch (err) {
   console.error("No se pudo eliminar");
  }
 }
}
