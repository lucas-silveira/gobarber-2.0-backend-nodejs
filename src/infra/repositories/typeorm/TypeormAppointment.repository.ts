import TypeormAppointmentSchema from '@infra/schemas/typeorm/TypeormAppointment.schema';
import { IAppointmentRepository } from '@domain/protocols/repository/AppointmentRepository.interface';

class TypeormAppointmentRepository implements IAppointmentRepository {
  public async findAll(): Promise<IAppointmentRepository.AppointmentData[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findByDate(
    date: Date,
  ): Promise<IAppointmentRepository.AppointmentData | null> {
    const appointments = await TypeormAppointmentSchema.findOne({
      where: { date },
    });
    return appointments || null;
  }

  public async create(
    appointment: IAppointmentRepository.AppointmentEntity,
  ): Promise<IAppointmentRepository.AppointmentData> {
    const newAppointment = TypeormAppointmentSchema.create(appointment);
    await TypeormAppointmentSchema.save(newAppointment);
    return newAppointment;
  }
}

export default TypeormAppointmentRepository;
