import IAppointmentEntity from '@domain/entities/AppointmentEntity.interface';
import TypeormAppointmentSchema from '@infra/schemas/typeorm/TypeormAppointment.schema';
import IAppointmentRepository from '@domain/protocols/repository/AppointmentRepository.interface';

class TypeormAppointmentRepository implements IAppointmentRepository {
  public async findAll(): Promise<IAppointmentEntity[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findByDate(
    date: Date,
  ): Promise<Required<IAppointmentEntity> | null> {
    const appointments = await TypeormAppointmentSchema.findOne({
      where: { date },
    });
    return appointments || null;
  }

  public async create(
    appointment: IAppointmentEntity,
  ): Promise<Required<IAppointmentEntity>> {
    const newAppointment = TypeormAppointmentSchema.create(appointment);
    await TypeormAppointmentSchema.save(newAppointment);
    return newAppointment;
  }
}

export default TypeormAppointmentRepository;
