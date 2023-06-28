import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Starbucks {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  menu: string;

  @Column()
  price: number;

  @Column()
  kcal: number;

  @Column()
  saturated_fat: number;

  @Column()
  protein: number;

  @Column()
  salt: number;

  @Column()
  sugar: number;

  @Column()
  caffeine: number;
}
