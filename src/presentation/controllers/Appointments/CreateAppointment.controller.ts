import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointment from '@domain/services/Appointments/CreateAppointment';
import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';

class CreateAppointmentController {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute = (
    request: Request,
    response: Response,
  ): Response<IAppointment> => {
    try {
      const { provider_name, date } = request.body;
      const parsedDate = parseISO(date);
      const createAppointment = new CreateAppointment(
        this.appointmentRepository,
      );
      const appointment = createAppointment.execute({
        provider_name,
        date: parsedDate,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  };
}

export default CreateAppointmentController;
