import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import { configureRouter } from './api/router.js';
import './dependencies.js';

try {
    const app = express();

    app.use(express.json());

    configureRouter(app);

    await mongoose.connect(config.dbConnection);
    console.log('Conectado a MongoDB');

    app.listen(config.port, () => {
        console.log(`Server escuchando en http://localhost:${config.port}`);
    });
} catch (error) {
    console.error('Error initianing the server', error);
}

