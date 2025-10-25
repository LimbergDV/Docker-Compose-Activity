const db = require('../models');
const Car = db.car;

exports.createCar = async (req, res) =>{
    try {
        console.log('Request Body', req, res);
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar)
    } catch (err) {
        console.log(err);
        return res.status(500).json(`Error al crear el carro`);
    }
};

exports.getAllCars = async (req, res) => {
    try {
        const car = await Car.findAll();
        res.json(car)
    } catch (err) {
        console.log(err);
        return res.status(500).json({err: "Error al obtener los carros"});
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({ error: 'Carro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carro' });
    }
};

exports.updateCar = async (req, res) => {
    const {id} = req.params;
    const updatedCarData = req.body;
    try {
        const [updatedRows]= await Car.update(updatedCarData,{
            where: {id_car: id}
        });

        if (updatedRows === 0) {
            return res.status(404).json({message: 'Carro no encontrado'});
        }
        const updatedCar = await Car.findByPk(id);
        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(500).json({message:'Error al actualizar carro'});
    }
};

exports.deleateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const deleateCar = await Car.destroy({
            where: { id_car: carId}
        });

        if (deleateCar) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Carro no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el carro:', error);
        return res.status(500).json({ error: 'Error al eliminar el carro' });
    }
};