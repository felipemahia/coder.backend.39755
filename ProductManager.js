import fs from 'fs'

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
    loadProducts() {
        try {
            const data = fs.readFileSync(this.#path, 'utf-8');
            this.#products = JSON.parse(data);
            this.nextId = this.#products.reduce((acc, p) => Math.max(acc, p.id), 0) + 1;
            this.nextCode = this.#products.reduce((acc, p) => Math.max(acc, p.code), 0) + 1;
        } catch (error) {
            console.error(`Error al buscar el archivo desde ${this.#path}: ${error}`);
        }
    }

    //ahora los guardo xD
    saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null);
            fs.writeFileSync(this.#path, data);
        } catch (error) {
            console.error(`Error guardando el producto en ${this.#path}: ${error}`);
        }
    }


    //Agrego nuevo producto y establezco obligatoriedad en todos los campos
    addProduct(category, title, model, description, price, thumbnail, stock) {

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

        this.saveProducts();
        return product;
    }


    getProducts() {
        return [...this.#products];
    }
    getProductById(id) {
        const indexId = this.#products.find(p => p.id === id);
        indexId ? console.log(indexId) : console.log(`No se encontró el producto con el id: ${id}`)
    }

    deleteProduct(id) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }

    updateProduct(id, data) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            const product = { ...this.#products[index], ...data, id };
            this.#products.splice(index, 1, product);
            this.saveProducts();
            return product;
        }
        return null;
    }

    
}

const manager = new ProductManager('products.json');


//metodo para agregar Productos
manager.addProduct('Smok', 'NORD 4', 5, "PRINCIPIANTES", './img/equipoprueba.png', 15, 'kitdeiniciopimpam');

//metodo para modificar Productos segun su ID
manager.updateProduct(1, { title: 'SMOK CAMBIADO' });

//método de borrado de un Producto segun su ID
manager.deleteProduct(2);

//método para buscar un Producto segun su ID
manager.getProductById(4);

console.log(manager.getProducts());