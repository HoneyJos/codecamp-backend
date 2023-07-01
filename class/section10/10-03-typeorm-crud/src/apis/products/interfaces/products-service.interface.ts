import { CreateProductInput } from '../dtos/create-product.input';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductServiceFindOne {
  productId: string;
}
