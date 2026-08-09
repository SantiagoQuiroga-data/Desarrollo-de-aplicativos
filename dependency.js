import userMongo from './mongo-db/user_mongo.js';
import { UserService } from './services/user_service.js';

const dependencies = {
    userRepo: userMongo,
    userService: new UserService(userMongo),
};

export function getDependency(name) {
    return dependencies[name];
}

export function addDependency(name, instance) {
    dependencies[name] = instance;
}