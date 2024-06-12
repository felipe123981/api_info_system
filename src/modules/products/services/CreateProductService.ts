import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
//import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository'; // Importe corretamente o repositório de clientes
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
//import RedisCache from '@shared/cache/RedisCache';
//import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);

    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new AppError('Already exists one product with this name.');
    }

    //const redisCache = new RedisCache();
    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
