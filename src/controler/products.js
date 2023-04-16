// products.js

const fs = require('fs');

// Lee los productos del archivo JSON
function readProducts() {
    const data = fs.readFileSync('./products.json');
    return JSON.parse(data);
}

// Escribe los productos en el archivo JSON
function writeProducts(products) {
    fs.writeFile('./products.json', JSON.stringify(products), err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Productos escritos en el archivo JSON');
        }
    });
}

// Elimina un producto por su ID
function deleteProductById(productId) {
    const products = readProducts();

    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex >= 0) {
        products.splice(productIndex, 1);
        writeProducts(products);
        return true;
    } else {
        return false;
    }
}

module.exports = { readProducts, writeProducts, deleteProductById };
