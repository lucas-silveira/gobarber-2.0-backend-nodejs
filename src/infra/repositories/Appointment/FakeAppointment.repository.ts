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
    const appointmentDB = this.appointments.find(appmnt =>
      this.dateHandler.isEqual(appmnt.date, date),
    );

    if (!appointmentDB) return null;

    const appointment = new Appointment();

    appointment.id = appointmentDB.id;
    appointment.provider_id = appointmentDB.provider_id;
    appointment.date = appointmentDB.date;

    return appointment;
  }

  public async create({
    provider_id,
    date,
  }: IAppointmentRepository.createInput): Promise<IAppointmentEntity> {
    const newAppointment = { provider_id, date, id: faker.random.uuid() };

    this.appointments.push(newAppointment);

    const appointment = new Appointment();

    appointment.id = newAppointment.id;
    appointment.provider_id = newAppointment.provider_id;
    appointment.date = newAppointment.date;

    return appointment;
  }
}

export default TypeormAppointmentRepository;
