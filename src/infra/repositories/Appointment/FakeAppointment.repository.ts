/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import DateFnsDateHandler from '@infra/utils/dateHandler/DateFnsDateHandler.adapter';
import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';
import Appointment from '@domain/entities/Appointment.entity';

class TypeormAppointmentRepository implements IAppointmentRepository {
  private appointments: Required<IAppointmentEntity>[];

  private dateHandler: IDateHandler;

  constructor() {
    this.appointments = [];
    this.dateHandler = new DateFnsDateHandler();
  }

  public async findAll(): Promise<IAppointmentEntity[]> {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<IAppointmentEntity | null> {
    const appointment = this.appointments.find(appmnt =>
      this.dateHandler.isEqual(appmnt.date, date),
    );

    if (!appointment) return null;

    return new Appointment(
      appointment.id,
      appointment.provider_id,
      appointment.date,
    );
  }

  public async create({
    provider_id,
    date,
  }: IAppointmentRepository.createInput): Promise<IAppointmentEntity> {
    const appointment = { provider_id, date, id: faker.random.uuid() };
    this.appointments.push(appointment);

    return new Appointment(
      appointment.id,
      appointment.provider_id,
      appointment.date,
    );
  }
}

export default TypeormAppointmentRepository;
