/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import IAppointment from '@domain/entities/Appointment.interface';
import IAppointmentRepository from '@domain/protocols/repository/AppointmentRepository.interface';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import DateFnsDateHandler from '@infra/utils/dateHandler/DateFnsDateHandler.adapter';

class TypeormAppointmentRepository implements IAppointmentRepository {
  private appointments: Required<IAppointment>[];

  private dateHandler: IDateHandler;

  constructor() {
    this.appointments = [];
    this.dateHandler = new DateFnsDateHandler();
  }

  public async findAll(): Promise<IAppointment[]> {
    return Promise.resolve(this.appointments);
  }

  public async findByDate(date: Date): Promise<Required<IAppointment> | null> {
    const appointment = this.appointments.find(appmnt =>
      this.dateHandler.isEqual(appmnt.date, date),
    );

    return Promise.resolve(cloneDeep(appointment) || null);
  }

  public async create(
    appointment: IAppointment,
  ): Promise<Required<IAppointment>> {
    const newAppointment = { ...appointment, id: faker.random.uuid() };
    this.appointments.push(newAppointment);
    return Promise.resolve(cloneDeep(newAppointment));
  }
}

export default TypeormAppointmentRepository;
