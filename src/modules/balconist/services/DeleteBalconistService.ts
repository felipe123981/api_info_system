import { getCustomRepository } from 'typeorm';
import { BalconistsRepository } from '../typeorm/repositories/BalconistsRepository';
import AppError from '@shared/errors/AppError';
//import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteBalconistService {
  public async execute({ id }: IRequest): Promise<void> {
    const balconistRepository = getCustomRepository(BalconistsRepository);

    const balconist = await balconistRepository.findOne(id);

    if (!balconist) {
      throw new AppError('Employee not found.');
    }
    //const redisCache = new RedisCache();

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await balconistRepository.remove(balconist);
  }
}

export default DeleteBalconistService;
