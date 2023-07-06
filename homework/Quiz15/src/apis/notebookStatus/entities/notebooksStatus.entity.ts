import { Field, ObjectType } from '@nestjs/graphql';
import { Notebook } from 'src/apis/notebooks/entities/notebook.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class NotebooksStatus {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  @OneToMany(() => Notebook, (notebook) => notebook.id)
  value: string;
}
