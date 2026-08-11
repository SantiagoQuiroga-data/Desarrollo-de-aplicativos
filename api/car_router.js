import { Router } from 'express';
import { getDependency } from '../dependency.js';
import { ValidationError, NotFoundError } from '../errors/app_errors.js';

export function configureCarRouter(parentRouter) {
const router = Router();
const carService = getDependency('carService');

router.get('/', async(req, res) => {
    try {
        const cars = await carService.getCars();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router. get('/:id', async (req, res) => {
    try {
        const car = await carService.getCarById(req.params.id);
        res.json(car);
    } catch {
        if (error instanceof NotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

router.post('/', async (req, res) => {
    try {
        const newCar = await carService.createCar(req.body);
        res.status(201).json(newCar);
    } catch(error) {
        if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
        
    }
});

router.delete('/:id', async(req,res) => {
    try {
        await carService.deleteCar(req.params.id);
        res.json( { message: 'Vehiculo eliminado con éxito'});
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        } 
        
    }
});

parentRouter.use('/cars', rotuer);

}