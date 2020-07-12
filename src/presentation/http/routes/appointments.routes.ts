import { Router } from 'express';

import appointmentControllerFactory from '@presentation/controllers/Appointments/AppointmentController.factory';
import { authenticationMiddleware } from '../middlewares';

const appointmentsRouter = Router();
const { listAppointment, createAppointment } = appointmentControllerFactory();

appointmentsRouter.use(authenticationMiddleware);

appointmentsRouter.get('/', async (_, response) => {
  const appointments = await listAppointment.handle();
  return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
  try {
    const appointment = await createAppointment.handle(request.body);
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
