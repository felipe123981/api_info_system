import { getCustomRepository } from 'typeorm';
import { AdminsRepository } from '../typeorm/repositories/AdminsRepository';
//import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository'; // Importe corretamente o repositório de clientes
import AppError from '@shared/errors/AppError';
import Admin from '../typeorm/entities/Admin'
//import RedisCache from '@shared/cache/RedisCache';
//import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  registration_number: number;
  password: string;
}

class CreateAdminService {
  public async execute({
    name,
    registration_number,
    password,
  }: IRequest): Promise<Admin> {
    const adminsRepository = getCustomRepository(AdminsRepository);

    const adminExists = await adminsRepository.findByNumber(registration_number);
    if (adminExists) {
      throw new AppError('Nobody found with this registry!');
    }

    //const redisCache = new RedisCache();
    const admin = adminsRepository.create({
      name,
      registration_number,
      password,
    });

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await adminsRepository.save(admin);

    return admin;
  }
}

export default CreateAdminService;
