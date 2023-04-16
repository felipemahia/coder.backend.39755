const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json());
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploader = multer({ storage })


const ProductManager = require('../public/ProductManager');
const manager = new ProductManager('./public/products.json');

app.use(express.static('public'))
app.use(express.json());
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});


app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = manager.getProducts();
    if (isNaN(limit)) {
        res.status(200).json(products);
    } else {
        res.status(200).json(products.slice(0, limit));
    }
});

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = manager.getProductById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.!!' });
    }
});

app.listen(port, () => {
    console.log(`Server Up en http://localhost:${port}`);
});