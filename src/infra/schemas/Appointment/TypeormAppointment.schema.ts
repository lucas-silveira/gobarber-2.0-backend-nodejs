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

import TypeormUserSchema from '../User/TypeormUser.schema';

@Entity('appointments')
class AppointmentSchema extends BaseEntity {
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
