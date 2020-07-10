import { Router } from 'express';

const authenticateRouter = Router();

authenticateRouter.post('/', async (request, response) => {
  try {
    return response.json({ ok: true });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default authenticateRouter;
