import userMongo from './mongo-db/user_mongo.js';
import { UserService } from './services/user_service';

const dependencies = {
    userRepo: userMongo,
    userService: new UserService(),
};

export function getDependency(name) {
    return dependencies[name];
}