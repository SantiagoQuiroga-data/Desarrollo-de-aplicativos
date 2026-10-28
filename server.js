import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import { configureRouter } from './api/router.js';
import './dependencies.js';
import errorMiddleware from './middlewares/error_middleware.js';
import logMiddleware from './middlewares/log_middleware.js';
import bcrypt from 'bcrypt';
import checkRoleMiddleware from './middlewares/check_role_middleware.js';
import { configureUserRouter } from './api/user_router.js';

console.log('Hash de 1234', await bcrypt.hash('1234', 10));


try {
    const app = express();

    app.use(express.json());
    app.use(logMiddleware);
   
    const apiRouter = express.Router(); 
    app.use('/api', apiRouter);
    configureRouter(apiRouter);

    const userRouter = express.Router();
    app.use('/api/users', userRouter);
    configureUserRouter(userRouter);

    app.use(errorMiddleware);

    await mongoose.connect(config.dbConnection);
    console.log('Conectado a MongoDB');

    app.listen(config.port, () => {
        console.log(`Server escuchando en http://localhost:${config.port}`);
    });


} catch (error) {
    console.error(error);
}

