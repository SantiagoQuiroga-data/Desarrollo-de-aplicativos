import { Router } from 'express';
import { getDependency } from '../dependency.js';
import checkRoleMiddleware from '../middlewares/check_role_middleware.js';
console.log('CAR ROUTER.JS CARGADO');
export function configureCarRouter(parentRouter) {
    console.log('CONFIGURANDO CAR ROUTER');
    const router = Router();
    const carService = getDependency('carService');


    router.get(
        '/',
        checkRoleMiddleware(['admin', 'user']),
        async (req, res, next) => {
            try {
                res.json(await carService.getCars());
            } catch (error) {
                next(error);
            }
        }
    );

    // POST /cars
    router.post(
        '/',
        checkRoleMiddleware(['user']),
        async (req, res, next) => {
            try {
                res.status(201).json(await carService.createCar(req.body));
            } catch (error) {
                next(error);
            }
        }
    );
    console.log('REGISTRANDO PATCH DE CARS');
    router.patch(
        '/test',
        async (req, res) => {
            console.log('patch funcionando');
            res.json({ message: 'PATCH FUNCIONA' });
        }
    );
    router.patch(
        '/:id',
        checkRoleMiddleware(['user']),
        async (req, res, next) => {
            try {
                console.log('ENTRO AL PATCH');
                const { id } = req.params;
                const updateData = req.body;
                const updatedCar = await carService.updateCar(id, updateData);
                res.json(updatedCar);
            } catch (error) {
                next(error);
            }
        });


    router.delete(
        '/:id',
        checkRoleMiddleware(['user']),
        async (req, res, next) => {
            try {
                await carService.deleteCar(req.params.id);
                res.json({ message: 'Vehículo eliminado con éxito' });
            } catch (error) {
                next(error);
            }
        }
    );

    parentRouter.use('/cars', router);
}