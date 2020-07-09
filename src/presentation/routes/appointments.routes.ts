import { Router } from 'express';

import appointmentControllerFactory from '@src/presentation/controllers/Appointments/AppointmentController.factory';

const appointmentsRouter = Router();
const appointmentController = appointmentControllerFactory();

appointmentsRouter.get('/', async (_, response) => {
  const appointments = await appointmentController.listAppointment.handle();
  return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
  try {
    const appointment = await appointmentController.createAppointment.handle(
      request.body,
    );
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
