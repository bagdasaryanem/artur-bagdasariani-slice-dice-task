import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../auth/user.entity';

@ObjectType()
@Entity()
export class Employee {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  salary: number;

  @Field()
  @Column()
  currency: string;

  @Field()
  @Column()
  department: string;

  @Field({ nullable: true })
  @Column({ name: 'sub_department', nullable: true })
  subDepartment?: string;

  @Field({ nullable: true })
  @Column({ name: 'on_contract', default: false, nullable: true })
  onContract?: boolean;

  @ManyToOne(() => User, (user) => user.employees)
  @Field(() => User)
  user: User;
}
