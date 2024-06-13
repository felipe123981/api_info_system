import { getCustomRepository } from 'typeorm';
import { BalconistsRepository } from '../typeorm/repositories/BalconistsRepository';
import Balconist from '../typeorm/entities/Balconist';
import AppError from '@shared/errors/AppError';
//import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  registration_number: number;
  password: string;
}

class UpdateBalconistService {
  public async execute({
    id,
    name,
    registration_number,
    password,
  }: IRequest): Promise<Balconist> {
    const balconistRepository = getCustomRepository(BalconistsRepository);

    const balconist = await balconistRepository.findOne(id);

    if (!balconist) {
      throw new AppError('Employee not found!');
    }



    //const redisCache = new RedisCache();

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    balconist.name = name;
    balconist.registration_number = registration_number;
    balconist.password = password;

    await balconistRepository.save(balconist);

    return balconist;
  }
}

export default UpdateBalconistService;
