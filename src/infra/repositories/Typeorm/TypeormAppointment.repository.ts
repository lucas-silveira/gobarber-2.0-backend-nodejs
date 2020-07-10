import IAppointment from '@domain/entities/Appointment.interface';
import TypeormAppointmentSchema from '@infra/schemas/Typeorm/TypeormAppointment.schema';
import IRepository from '../Repository.interface';

class TypeormAppointmentRepository implements IRepository<IAppointment> {
  public async findAll(): Promise<IAppointment[]> {
    return TypeormAppointmentSchema.find();
  }

  public async findOne(
    where: Partial<IAppointment>,
  ): Promise<IAppointment | null> {
    const appointments = await TypeormAppointmentSchema.findOne({ where });
    return appointments || null;
  }

  public async create(appointment: IAppointment): Promise<IAppointment> {
    const newAppointment = TypeormAppointmentSchema.create(appointment);
    await TypeormAppointmentSchema.save(newAppointment);
    return newAppointment;
  }
}

export default TypeormAppointmentRepository;
