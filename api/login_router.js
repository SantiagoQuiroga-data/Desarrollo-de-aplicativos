import { getDependency } from '../dependency.js';

export function configureLoginRouter(router) {
    const loginService = getDependency('loginService');

    router.post('/login', async (req, res) => {
        console.log('1. LLEGO AL POST LOGIN');
        const data = req.body;
        console.log('2 DATA', data);
        const session = await loginService.login(data);
        console.log('3 SESSION RECIBIDA', session);
        res.json(session);
        console.log('4 RESPONSE ENVIADA');

    });
}