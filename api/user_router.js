import { getDependency } from '../dependency.js';

export function configureUserRouter(router) {
    const userService = getDependency('userService');

    // GET(obtener usuario por nombre)

    router.get('/users', async (req, res) => {
        const users = await userService.getList();
        res.json(users.map(user => ({
            username: user.username,
            email: user.email,
            role: user.role,
        })));

    });

    //Post(Crear nuevo usuario)
    router.post('/users', async (req, res) => {
        try{ 
        const user = req.body;
        const newUser = await userService.add(user);
        res.json(201).json(newUser);
        } catch(erro) {
            res.status(400).json({ error: error.message });
        }
    });
    // Patch(modificar usuario)

    router.patch('/users/:username', async (req, res) => {
        const { username } = req.parms;
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