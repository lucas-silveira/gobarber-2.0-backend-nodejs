import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import Appointment from '../entities/Appointment';
import AppointmentRepository from '../repositories/Appointment.repository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentRepository.findAll();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider_name, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate)
    return response
      .status(400)
      .json({ message: 'This appointment is already booked.' });

  const appointment = new Appointment(provider_name, parsedDate);
  appointmentRepository.create(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
