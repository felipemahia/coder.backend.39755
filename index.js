class ProductManager {
    #products;
    #nextId;

    constructor() {
        this.#products = [];
        this.#nextId = 1;
    }


    //Agrego nuevo producto y establezco obligatoriedad en todos los campos
    addProduct(category, title, description, price, thumbnail, code, stock) {
        if (!category || !title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }
        //Acá para que no se repita el code
        if (this.#products.find((product) => product.code === code)) {
            console.error(`Ya existe un producto con el código ${code}`);
            return;
        }

        //Creo constante para crear el objeto
        const product = {
            id: this.#nextId++,
            category,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.#products.push(product);
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        const product = this.#products.find((product) => product.id === id);

        if (!product) {
            console.error("Lo siento, producto no encontrado");
        }

        if (typeof id !== "number") throw new Error("ERROR: El Id debe ser un número");

        if (!product) throw new Error(`ERROR: No se encontró un producto con Id ${id}`);

        return product;
    }
}


const productManager = new ProductManager()

productManager.addProduct('Atomizador', 'SMOK', 'NORD4', 2000, './images/atomizador1.png', 20) //Le falta un dato, tira error
productManager.addProduct('Atomizador', 'SMOK', 'VAPEPEN22', 2500, './images/atomizador2.png', '', 20) //No carga porque tiene un valor vacío
productManager.addProduct('Atomizador', 'SMOK', 'STICKPRINCE', 2100, './images/atomizador3.png', 'AC', 20) //Se Carga
productManager.addProduct('Atomizador', 'VAPORESSO', 'SKYSOLO', 3000, './images/atomizador4.png', 'AD', 12) //Se Carga
productManager.addProduct('Atomizador', 'JOYTECH', 'EXCEED', 1600, './images/atomizador5.png', 'AE', 22) //Se Carga
productManager.addProduct('Atomizador', 'VAPORESSO', 'POD', 1600, './images/atomizador6.png', 'AE', 35) //No se carga porque tiene el "code" repetido

console.log(productManager.getProducts())

/* // Pruebas {
 try {
    const product = productManager.getProductById(1); //El Id Existe.!
    console.log(product);
}
catch (error) {
    console.error(error.message);
}
try {
    const product = productManager.getProductById(3); //El Id Existe.!
    console.log(product);
}
catch (error) {
    console.error(error.message);
}

try {
    const product = productManager.getProductById(6); //El Id No Existe.! (ERROR)
    console.log(product);
}
catch (error) {
    console.error(error.message);
}

try {
    const product = productManager.getProductById('1'); //El Id No es un Número.! (ERROR)
    console.log(product);
}
catch (error) {
    console.error(error.message);
} 
}
*/