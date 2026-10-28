import { getDependency } from '../dependency.js';
import bcrypt from 'bcrypt';

const hash = await bcrypt.hash('1234', 10);
console.log(hash);
console.log(await bcrypt.compare('1234', hash));

export class LoginService {
    constructor() {
        this.userService = getDependency('userService');
        this.sessionService = getDependency('sessionService');
    }

    async login(data) {
        if (!data.username)
            throw new Error('El nombre del usuario es obligatorio');

        if (!data.password)
            throw new Error('La constraseña es obligatoria');

        const user = await this.userService.getByUsername(data.username);
        console.log('USUARIO ENCONTRADO', user);
        if (!user)
            throw new Error('Usuario o contraseña incorrectos');
        console.log('PASSWORD INGRESADA', data.password);
        console.log('PASSWORD EN BD', user.password);
        const isMatch = await bcrypt.compare(data.password, user.password);
        console.log('PASSWORD COINCIDE', isMatch);
        if (!isMatch)
            throw new Error('Usuario o contraseña incorrectos');

        console.log('ROL DEL USUARIO', user.role);
        console.log('USUARIO COMPLETO', user);
        const session = await this.sessionService.createForUser(user);
        console.log('SESSION CREADA', session);
        const response = {
            authorizationToken: session.rawToken,
            username: session.username,
            role: session.role
        };
        console.log('RESPUESTA LOGIN:', response);
        return response;
    }
}