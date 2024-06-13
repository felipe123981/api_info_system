import { getCustomRepository } from 'typeorm';
import { AdminsRepository } from '../typeorm/repositories/AdminsRepository';
import Admin from '../typeorm/entities/Admin';
//import RedisCache from '@shared/cache/RedisCache';

class ListAdminsService {
  public async execute(): Promise<Admin[]> {
    const adminsRepository = getCustomRepository(AdminsRepository);

    //const redisCache = new RedisCache();
    //let products = await redisCache.recover<Product[]>(
    //  'api-vendas-PRODUCT-LIST',
    //);

    //if (!products) {
      const admins = await adminsRepository.find();

      //await redisCache.save('api-vendas-PRODUCT_LIST', products);
    //}

    return admins;
  }
}

export default ListAdminsService;
