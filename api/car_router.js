import { Router } from 'express';
import { getDependency } from '../dependency.js';

export function configureCarRouter(parentRouter) {
const router = Router();
const carService = getDependency('carService');

router.get('/', async(req, res, next) => {
    try {
        const cars = await carService.getCars();
        res.json(cars);
    } catch (error) {
        next(error);
    }
});
router. get('/:id', async (req, res, next) => {
    try {
        const car = await carService.getCarById(req.params.id);
        res.json(car);
    } catch {
       next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newCar = await carService.createCar(req.body);
        res.status(201).json(newCar);
    } catch(error) {
        next(error);
    }
});

router.delete('/:id', async(req,res, next) => {
    try {
        const updatedCar = await carService.updateCar(req.params.id, req.body);
        res.json(updatedCar);
    } catch (error) {
       next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        await carService.deleteCar(req.params.id);
        res.json({ message: 'Vehículo eliminado con éxito'});
    } catch (error) {
        next(error);
    }
});

parentRouter.use('/cars', rotuer);

}