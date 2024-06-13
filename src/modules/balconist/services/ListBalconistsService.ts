import { getCustomRepository } from 'typeorm';
import { BalconistsRepository } from '../typeorm/repositories/BalconistsRepository';
import Balconist from '../typeorm/entities/Balconist';
//import RedisCache from '@shared/cache/RedisCache';

class ListBalconistsService {
  public async execute(): Promise<Balconist[]> {
    const balconistsRepository = getCustomRepository(BalconistsRepository);

    //const redisCache = new RedisCache();
    //let products = await redisCache.recover<Product[]>(
    //  'api-vendas-PRODUCT-LIST',
    //);

    //if (!products) {
      const balconists = await balconistsRepository.find();

      //await redisCache.save('api-vendas-PRODUCT_LIST', products);
    //}

    return balconists;
  }
}

export default ListBalconistsService;
