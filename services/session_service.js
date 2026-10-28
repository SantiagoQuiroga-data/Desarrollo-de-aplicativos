import { getDependency } from '../dependency.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';



export class SessionService {
    constructor() {
        this.sessionRepo = getDependency('sessionRepo');
    }

    async createForUser(user) {
        console.log('CREANDO SESION PARA', user.username);
        console.log('ROL DEL USUARIO QUE VOY A GUARDAR', user.role);
        const rawToken = crypto.randomBytes(32).toString('hex');
        console.log('TOKEN GENERADO');
        const hashedToken = await bcrypt.hash(rawToken, 10);
        console.log('TOKEN GENERADO');

        const newSession = await this.sessionRepo.create({
            username: user.username,
            authorizationToken: hashedToken,
            userId: user._id || user.id,
            role: user.role,
            open: new Date().toISOString()
        });
        console.log('SESION GUARDADA', newSession);

        return {
            ...newSession.toObject(),
            rawToken: rawToken
        };
    }

    async getByToken(token) {
        console.log('TOKEN RECIBIDO', token);
        const sessions = await this.sessionRepo.find();
        console.log('SESIONES', sessions);

        for (const session of sessions) {
            const hashEnBD = session.authorizationToken;
            console.log('HASH EN BD', hashEnBD);
            
            const isMatch = await bcrypt.compare(token, hashEnBD);
            console.log('COINCIDE', isMatch);
            if (isMatch) {
                return session;
            }
        }
        return null;
    }

}

  