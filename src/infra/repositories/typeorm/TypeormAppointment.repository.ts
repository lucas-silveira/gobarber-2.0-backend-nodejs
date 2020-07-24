import IAppointment from '@domain/entities/Appointment.interface';
import TypeormAppointmentSchema from '@infra/schemas/typeorm/TypeormAppointment.schema';
import IAppointmentRepository from '@domain/protocols/repository/AppointmentRepository.interface';

class TypeormAppointmentRepository implements IAppointmentRepository {
  public async findAll(): Promise<IAppointment[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findOne(
    where: Partial<IAppointment>,
  ): Promise<Required<IAppointment> | null> {
    const appointments = await TypeormAppointmentSchema.findOne({ where });
    return appointments || null;
  }

  public async create(
    appointment: IAppointment,
  ): Promise<Required<IAppointment>> {
    const newAppointment = TypeormAppointmentSchema.create(appointment);
    await TypeormAppointmentSchema.save(newAppointment);
    return newAppointment;
  }
}

export default TypeormAppointmentRepository;
