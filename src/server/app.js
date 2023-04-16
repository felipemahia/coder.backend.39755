const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const path = require('path')
const productsRouter = require('../routes/products.router');
const productsEditRouter = require('../routes/productseditid.router');
const productsdeletebyidRouter = require('../routes/productsdeletebyid.router');
const productsIdRouter = require('../routes/productsid.router');
const productsTableRouter = require('../routes/productstable.router');
const cartRouter = require('../routes/carts.router');
const indexRouter = require('../routes/index.router');


const methodOverride = require('method-override');


// Configuracion de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')


// Configuracion de JSON
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configuracion de los metodos de envio de formulario
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Configuracion de las Rutas Principales
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'))


// Rutas
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/productstable', productsTableRouter);
app.use('/productsdeletebyid', productsdeletebyidRouter);
app.use('/productsedit', productsEditRouter);
app.use('/productsid', productsIdRouter);
app.use('/carts', cartRouter);


// Server en escucha
const port = 8080;

app.listen(port, () => {
    console.log(`Server Up en http://localhost:${port}`);
});
