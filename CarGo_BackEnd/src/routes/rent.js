const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rentController');

//crear un renta
router.post('/addRent', rentController.createRent);

//obtener todos las rentas
router.get('/getAllRents', rentController.getAllRents);

//obtener un renta por ID
router.get('/getRents/:id', rentController.getRentById);

//editar
router.put('/updateRent/:id', rentController.updateRent);

//eliminar
router.delete('/deleteRent/:id', rentController.deleateRent);

module.exports=router;