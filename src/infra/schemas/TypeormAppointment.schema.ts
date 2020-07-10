import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import IAppointment from '@src/domain/entities/Appointment.interface';
import TypeormUserSchema from './TypeormUser.schema';

@Entity('appointments')
class AppointmentSchema extends BaseEntity implements IAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => TypeormUserSchema)
  @JoinColumn({ name: 'provider_id' })
  provider: TypeormUserSchema;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentSchema;
