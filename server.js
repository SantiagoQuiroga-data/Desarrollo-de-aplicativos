import mongoose from 'mongoose';

import express from 'express';
import { configureRouter } from './api/router.js';
import './dependencies.js';

const app = express();
const PORT = 3000;
//Leer los datos enviados en formato json
app.use(express.json());

configureRouter(app);

await mongoose.connect('mongodb://localhost:27017/Trabajo_aplicativ')
console.log('Conectado a MongoDB')
app.listen(PORT, () => {
    console.log(`Server escuchando e http://localhost:${PORT}`);
});
