import { configureUserRouter } from './user_router.js';
import { configureCarRouter } from './car_router.js';
import { configureLoginRouter } from './login_router.js';
import checkAuthorizationTokenMiddleware from '../middlewares/check_authorization_token_middleware.js';

export function configureRouter(router) {
    console.log('Configurando rutas principales');
     configureLoginRouter(router);
     router.use(checkAuthorizationTokenMiddleware);
    configureUserRouter(router);
    configureCarRouter(router);
   
}