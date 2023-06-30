import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Starbucks {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { nullable: true })
  id: number;

  @Column()
  @Field(() => String, { nullable: true })
  menu: string;

  @Column()
  @Field(() => Int, { nullable: true })
  price: number;

  @Column()
  @Field(() => Int, { nullable: true })
  kcal: number;

  @Column()
  @Field(() => Int, { nullable: true })
  saturated_fat: number;

  @Column()
  @Field(() => Int, { nullable: true })
  protein: number;

  @Column()
  @Field(() => Int, { nullable: true })
  salt: number;

  @Column()
  @Field(() => Int, { nullable: true })
  sugar: number;

  @Column()
  @Field(() => Int, { nullable: true })
  caffeine: number;
}
