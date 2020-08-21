import TypeormAppointmentSchema from '@infra/schemas/Appointment/TypeormAppointment.schema';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';
import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';
import Appointment from '@domain/entities/Appointment.entity';

class TypeormAppointmentRepository implements IAppointmentRepository {
  public async findAll(): Promise<IAppointmentEntity[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findByDate(date: Date): Promise<IAppointmentEntity | null> {
    const appointmentDB = await TypeormAppointmentSchema.findOne({
      where: { date },
    });

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
    const newAppointment = TypeormAppointmentSchema.create({
      provider_id,
      date,
    });
    await TypeormAppointmentSchema.save(newAppointment);

    const appointment = new Appointment();

    appointment.id = newAppointment.id;
    appointment.provider_id = newAppointment.provider_id;
    appointment.date = newAppointment.date;

    return appointment;
  }
}

export default TypeormAppointmentRepository;
