import { addDependency } from './dependency.js';
import { UserService } from './services/user_service.js';
import userMongo from './mongo-db/user_mongo.js';
import carMongo from './mongo-db/car_mongo.js';
import { CarService } from './services/car_service.js';

addDependency('userRepo', userMongo);
addDependency('userService', new UserService(userMongo));

addDependency('carRepo', carMongo);
addDependency('carService', new CarService(carMongo));

