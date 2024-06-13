import { getCustomRepository } from 'typeorm';
import { BalconistsRepository } from '../typeorm/repositories/BalconistsRepository';
//import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository'; // Importe corretamente o repositório de clientes
import AppError from '@shared/errors/AppError';
import Balconist from '../typeorm/entities/Balconist'
//import RedisCache from '@shared/cache/RedisCache';
//import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  registration_number: number;
  password: string;
}

class CreateBalconistService {
  public async execute({
    name,
    registration_number,
    password,
  }: IRequest): Promise<Balconist> {
    const balconistsRepository = getCustomRepository(BalconistsRepository);

    const balconistExists = await balconistsRepository.findByNumber(registration_number);
    if (balconistExists) {
      throw new AppError('There is already another employee with this registry!');
    }

    //const redisCache = new RedisCache();
    const balconist = balconistsRepository.create({
      name,
      registration_number,
      password,
    });

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await balconistsRepository.save(balconist);

    return balconist;
  }
}

export default CreateBalconistService;
