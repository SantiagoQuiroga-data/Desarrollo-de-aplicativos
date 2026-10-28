// 1. Imports SIEMPRE arriba del todo
import UserMongo from './mongo-db/user_mongo.js';
import { UserService } from './services/user_service.js';

import CarMongo from './mongo-db/car_mongo.js';
import { CarService } from './services/car_service.js';


const dependencies = {};


export function addDependency(name, instance) {
    dependencies[name] = instance;
}

export function getDependency(name) {
    return dependencies[name];
}

addDependency('userRepository', UserMongo);

const userService = new UserService(UserMongo);
addDependency('userService', userService);

addDependency('carRepository', CarMongo);

const carService = new CarService(CarMongo);
addDependency('carService', carService);


export { dependencies };