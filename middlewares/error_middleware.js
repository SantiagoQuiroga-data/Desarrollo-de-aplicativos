import { ValidationError, NotFoundError } from '../errors/app_errors';

export default async function errorMiddleware(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }

    res.status(500).json({ error: err.message || 'Error interno del servidor'});
}