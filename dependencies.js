import { addDependency } from './dependency.js';
import { UserService } from './services/user_service.js';
import userMongo from './mongo-db/user_mongo.js';

addDependency('userService', new UserService());
addDependency('userRepo', new UserMongo());