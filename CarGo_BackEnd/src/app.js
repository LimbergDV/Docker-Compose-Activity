const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customer');
const carRoutes = require('./routes/car');
const rentRoutes = require('./routes/rent');


const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());


//Cargar las rutas
app.use('/car', carRoutes);
app.use('/customer', customerRoutes);
app.use('/rent', rentRoutes);

module.exports = app;