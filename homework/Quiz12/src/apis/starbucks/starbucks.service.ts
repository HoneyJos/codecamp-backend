import { Injectable } from '@nestjs/common';
import { CreateStarbucksInput } from './dto/create-starbucks-input';
import { Starbucks } from './entities/starbucks.entity';

interface IStarbucksCreate {
  createStarbucksInput: CreateStarbucksInput;
}

export type Coffee = Omit<Starbucks, 'id'>;

@Injectable()
export class StarbucksService {
  findAll(): Coffee[] {
    const data: Coffee[] = [
      {
        menu: 'coldbrew',
        price: 5000,
        kcal: 50,
        saturated_fat: 15,
        protein: 24,
        salt: 10,
        sugar: 0,
        caffeine: 150,
      },
      {
        menu: 'americano',
        price: 3000,
        kcal: 10,
        saturated_fat: 15,
        protein: 24,
        salt: 10,
        sugar: 0,
        caffeine: 200,
      },
      {
        menu: 'caffelatte',
        price: 5500,
        kcal: 50,
        saturated_fat: 15,
        protein: 24,
        salt: 10,
        sugar: 0,
        caffeine: 150,
      },
      {
        menu: 'caramellatte',
        price: 7500,
        kcal: 50,
        saturated_fat: 15,
        protein: 15,
        salt: 10,
        sugar: 100,
        caffeine: 150,
      },
      {
        menu: 'vanilalatte',
        price: 7000,
        kcal: 100,
        saturated_fat: 15,
        protein: 24,
        salt: 10,
        sugar: 0,
        caffeine: 150,
      },
    ];
    return data;
  }

  createCoffee(createStarbucksInput: IStarbucksCreate): string {
    console.log(createStarbucksInput);
    return '등록에 성공하였습니다';
  }
}
