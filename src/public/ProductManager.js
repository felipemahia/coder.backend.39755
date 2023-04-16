const fs = require('fs').promises; 

class ProductManager {
    #products;
    #path

    constructor(path) {
        this.#path = path;
        this.#products = [];
        this.nextId = 1;
        this.nextCode = '1001';
        this.loadProducts();
    }

    //cargo productoss
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

    //ahora los guardo xD
    async saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 4);
            await fs.writeFile(this.#path, data);
        } catch (error) {
            console.error(`Error guardando el producto en ${this.#path}: ${error}`);
        }
    }


    //Agrego nuevo producto y establezco obligatoriedad en todos los campos
    async addProduct(category, title, model, description, price, thumbnail, stock) {

        const product = {
            id: this.nextId++,
            category,
            title,
            model,
            description,
            price,
            thumbnail,
            stock,
            code: this.nextCode++,
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


    async deleteProduct(id) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            await this.saveProducts();
            return true;
        }
        return false;
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
}

module.exports = ProductManager; 

/* 
//metodo para agregar Productos
manager.addProduct('Smok', 'NORD 4', 5, "PRINCIPIANTES", './img/equipoprueba.png', 15, 'kitdeiniciopimpam');

//metodo para modificar Productos segun su ID
manager.updateProduct(1, { title: 'SMOK CAMBIADO' });

//método de borrado de un Producto segun su ID
manager.deleteProduct(2);

//método para buscar un Producto segun su ID
manager.getProductById(4);

console.log(manager.getProducts()); */