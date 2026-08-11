import { configureUserRouter } from './user_router.js';
import { configureCarRouter } from './car_router.js';

export function configureRouter(router) {
    console.log('Configurando rutas principales');
    configureUserRouter(router);
    configureCarRouter(router);
}