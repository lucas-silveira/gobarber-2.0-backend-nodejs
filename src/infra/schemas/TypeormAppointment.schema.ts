import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

import IAppointment from '@src/domain/entities/Appointment.interface';

@Entity('appointments')
class AppointmentSchema extends BaseEntity implements IAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_name: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default AppointmentSchema;
