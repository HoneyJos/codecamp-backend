import { Field, ObjectType } from '@nestjs/graphql';
import { NotebooksModel } from 'src/apis/notebookModels/entities/notebooksModel.entity';
import { NotebooksStatus } from 'src/apis/notebookStatus/entities/notebooksStatus.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Notebook {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  serialNumber: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  used_yearmonth?: string;

  @Column()
  @Field(() => Date, { nullable: true })
  made_yearmonth?: Date;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  note?: string;

  @Column()
  @Field(() => Date)
  purchase_date: Date;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  transfer_date?: Date;

  @ManyToOne(() => NotebooksStatus)
  @Field(() => NotebooksStatus, { nullable: true })
  status?: NotebooksStatus;

  @ManyToOne(() => NotebooksModel)
  model: NotebooksModel;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
