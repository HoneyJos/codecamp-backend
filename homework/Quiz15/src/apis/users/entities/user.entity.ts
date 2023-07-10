import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id?: string;

  @Column()
  @Field(() => String)
  ko_name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  en_name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  company: string;

  @Column()
  @Field(() => String)
  team: string;
}
