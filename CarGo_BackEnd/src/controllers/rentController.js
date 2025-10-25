const db = require('../models');
const Rent = db.rent;

exports.createRent = async (req, res) =>{
    try {
        console.log('Request Body', req, res);
        const newRent = await Rent.create(req.body);
        res.status(201).json(newRent)
    } catch (err) {
        console.log(err);
        return res.status(500).json(`Error al crear la renta del carro`);
    }
};

exports.getAllRents = async (req, res) => {
    try {
        const Rents = await Rent.findAll();
        res.json(Rents)
    } catch (err) {
        console.log(err);
        return res.status(500).json({err: "Error al obtener las rentas del carro"});
    }
};

exports.getRentById = async (req, res) => {
    try {
        const Rent = await Rent.findByPk(req.params.id);
        if (Rent) {
            res.status(200).json(Rent);
        } else {
            res.status(404).json({ error: 'Renta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la renta del carro' });
    }
};

exports.updateRent = async (req, res) => {
    const {id} = req.params;
    const updatedRentData = req.body;
    try {
        const [updatedRows]= await Rent.update(updatedRentData,{
            where: {id_rent: id}
        });

        if (updatedRows === 0) {
            return res.status(404).json({message: 'Renta del carro no encotrada'});
        }
        const updatedRent = await Rent.findByPk(id);
        res.status(200).json(updatedRent);
    } catch (err) {
        res.status(500).json({message:'Error al actualizar la renta del carro'});
    }
};

exports.deleateRent = async (req, res) => {
    try {
        const rentId = req.params.id;
        const deleateRent = await Rent.destroy({
            where: { id_rent: rentId }
        });

        if (deleateRent) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Renta del carro no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la renta del carro:', error);
        return res.status(500).json({ error: 'Error al eliminar la renta del carro' });
    }
};