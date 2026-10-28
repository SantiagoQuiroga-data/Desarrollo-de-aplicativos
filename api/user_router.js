import { getDependency } from '../dependency.js';
import checkRoleMiddleware from '../middlewares/check_role_middleware.js';

export function configureUserRouter(router) {
    const userService = getDependency('userService');

    // GET(obtener usuario por nombre)

    router.get('/users', checkRoleMiddleware(['admin']), async (req, res) => {
        const users = await userService.getList();
        res.json(users.map(user => ({
            username: user.username,
            email: user.email,
            role: user.role,
        })));
    });

    //Post(Crear nuevo usuario)
    router.post('/users', checkRoleMiddleware(['admin']), async (req, res) => {
        const user = req.body;
        const newUser = await userService.add(user);
        res.json(newUser);
    });
    // Patch(modificar usuario)

    router.patch('/users/:username', async (req, res) => {
        const { username } = req.params;
        const updateData = req.body;
        const updatedUser = await userService.update(username, updateData);
        res.json(updatedUser);
    });

    //Delete(elminar usuario)
    router.delete('/users/:username', async (req, res) => {
        const { username } = req.params;
        await userService.delete(username);
        res.json({ message: 'Usuario eliminado correctamente' });
    });
}