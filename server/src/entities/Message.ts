import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @ManyToOne(() => User, (user) => user.messages)
  receiver!: User;

  @Field()
  @Column()
  message!: string;

  @Field()
  @Column()
  receiverId!: number;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
