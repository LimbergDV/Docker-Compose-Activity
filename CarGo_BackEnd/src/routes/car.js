const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

//crear un carro
router.post('/addCar', carController.createCar);

//obtener todos los carros
router.get('/getCars', carController.getAllCars);

//obtener un carro por ID
router.get('/getCar/:id', carController.getCarById);

//editar
router.put('/updateCar/:id', carController.updateCar);

//eliminar
router.delete('/deleteCar/:id', carController.deleateCar);

module.exports=router;