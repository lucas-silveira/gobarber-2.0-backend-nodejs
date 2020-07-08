import { Request, Response } from 'express';

import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from '@infra/repositories/Repository.interface';

class ListAppointmentController {
  private appointmentRepository: IRepository;

  constructor(appointmentRepository: IRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute = (_: Request, response: Response): Response<IAppointment> => {
    const appointments = this.appointmentRepository.findAll();

    return response.json(appointments);
  };
}

export default ListAppointmentController;
