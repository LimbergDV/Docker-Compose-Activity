const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customersController');

//crear un cliente
router.post('/addCustomer', customerController.createCustomer);

//obtener todos los clientes
router.get('/getCustomers', customerController.getAllCustomers);

//obtener un cliente por ID
router.get('/getCustomer/:id', customerController.getCustomerById);

//editar
router.put('/updateCustomer/:id', customerController.updateCustomer);

//eliminar
router.delete('/deleteCustomer/:id', customerController.deleateCustomer);

// ruta con mi nombre
router.get('/delvalle', (req, res) => {
  res.json({ nombre: "Limberg Del Valle Vargas" });
});

module.exports=router;