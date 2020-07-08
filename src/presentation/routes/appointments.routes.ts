import { Router } from 'express';

import AppointmentRepository from '@infra/repositories/Appointment.repository';
import CreateAppointmentController from '@presentation/controllers/Appointments/CreateAppointment.controller';
import ListAppointmentController from '@presentation/controllers/Appointments/ListAppointment.controller';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();
const createAppointmentController = new CreateAppointmentController(
  appointmentRepository,
);
const listAppointmentController = new ListAppointmentController(
  appointmentRepository,
);

appointmentsRouter.get('/', (_, response) => {
  const appointments = listAppointmentController.execute();

  return response.json(appointments);
});
appointmentsRouter.post('/', (request, response) => {
  try {
    const appointment = createAppointmentController.execute(request.body);

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
