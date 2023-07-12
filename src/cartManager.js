import fs from "fs";

export default class ClassManager {
    #path;

    constructor(path) {
        this.#path = path;
    }

    async getCarritos() {
        try {
            const carts = await fs.promises.readFile(this.#path, "utf-8");

            return JSON.parse(carts);
        } catch (err) {
            return [];
        }
    }

    async addProdToCart(cid, pid) {
        let carts = await this.getCarritos();

        const existingCart = carts.find(cart => cart.id == cid);
        if (!existingCart) {
            console.error("El carrito no existe");
            return;
        }

        const existingProduct = existingCart.products.find(product => product.id == pid);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            const newProduct = {
                id: pid,
                quantity: 1
            };
            existingCart.products.push(newProduct);
            carts = [...carts, existingCart]
        }

        await fs.promises.writeFile(this.#path, JSON.stringify(carts));

        return 'Agregado'

    }

    async createCart() {
        const carts = await this.getCarritos();

        const newCartId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        const newCart = {
            id: newCartId,
            products: []
        };

        carts.push(newCart);

        await fs.promises.writeFile(this.#path, JSON.stringify(carts));

        return newCartId;
    }
}