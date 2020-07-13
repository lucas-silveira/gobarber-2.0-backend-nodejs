import IAppointment from '@domain/entities/Appointment.interface';
import IRepository from './Repository.interface';

export default interface IAppointmentRepository {
  findAll: IRepository.FindAll<IAppointment>;
  findOne: IRepository.FindOne<IAppointment, Required<IAppointment>>;
  create: IRepository.Create<IAppointment, Required<IAppointment>>;
}
