const fs = require('fs').promises;

class ProductManager {
    #products;
    #path;

    constructor(path) {
        this.#path = path;
        this.#products = [];
        this.nextId = 1;
        this.nextCode = '20231';
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.#path, 'utf-8');
            this.#products = JSON.parse(data);
            this.nextId = this.#products.reduce((acc, p) => Math.max(acc, p.id), 0) + 1;
            this.nextCode = this.#products.reduce((acc, p) => Math.max(acc, p.code), 0) + 1;
        } catch (error) {
            console.error(`Error al buscar el archivo desde ${this.#path}: ${error}`);
        }
    }

    async saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 4);
            await fs.writeFile(this.#path, data);
        } catch (error) {
            console.error(`Error guardando el producto en ${this.#path}: ${error}`);
        }
    }

    async addProduct(title, model, category, description, price, thumbnail, stock) {

        const product = {
            id: this.nextId++,
            title,
            model,
            category,
            description,
            price,
            thumbnail,
            code: this.nextCode++,
            stock,
        };
        this.#products.push(product);

        await this.saveProducts();
        return product;
    }

    getProducts() {
        return [...this.#products];
    }

    getProductById(id) {
        return this.#products.find(p => p.id === id);
    }

    async updateProduct(id, data) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            const product = { ...this.#products[index], ...data, id };
            this.#products.splice(index, 1, product);
            await this.saveProducts();
            return product;
        }
        return null;
    }

    async deleteProduct(id) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            await this.saveProducts();
            return true;
        }
        return false;
    }
}

module.exports = ProductManager;
