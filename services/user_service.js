import { getDependency } from '../dependency.js';

export class UserService {
    constructor() {
        this.userRepo = getDependency('serRepo');
    }
    async getList() {
        return await this.userRepo.find();
    }

    async add(user) {
        if (!user.username) throw new Error('El nombre de usuario es obligatorio');
        if (!user.password) throw new Error('La contraseña es obligatorio');
        
    
        const existentUser = await this.userRepo.find({
            username: user.username
        });
        
        if (existentUser.length) throw new Error('El nombre del usuario ya existe');

        return this.userRepo.create(user);
    }
}

