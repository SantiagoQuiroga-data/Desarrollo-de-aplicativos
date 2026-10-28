import { getDependency } from '../dependency.js';
import bcrypt from 'bcrypt';

export class UserService {
    constructor() {
        this.userRepo = getDependency('userRepo');
    }

    async getList() {
        return await this.userRepo.find();
    }

    async getByUsername(username) {
        console.log('USERNAME BUSCADO', username);
        console.log('USER REPO', this.userRepo);
        const usuarios = await this.userRepo.find();
        console.log('USUARIOS ENCONTRADOS', usuarios);
        const usuario = await this.userRepo.findOne({ username });
        console.log('RESULTADO FIND ONE', usuario);

        return usuario;
    }

    async add(user) {
        if (!user.username)
            throw new Error('El nombre de usuario es obligatorio');

        if (!user.password)
            throw new Error('La contraseña es obligatoria');
        if (user.password === '1234')
            throw new Error('La contraseña no puede ser 1234');

        const existentUser = await this.userRepo.find({
            username: user.username
        });

        if (existentUser.length)
            throw new Error('El nombre del usuario ya existe');

        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepo.create(user);
    }
}