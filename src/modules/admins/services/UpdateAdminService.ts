import { getCustomRepository } from 'typeorm';
import { AdminsRepository } from '../typeorm/repositories/AdminsRepository';
import Balconist from '../typeorm/entities/Admin';
import AppError from '@shared/errors/AppError';
//import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  registration_number: number;
  password: string;
}

class UpdateAdminService {
  public async execute({
    id,
    name,
    registration_number,
    password,
  }: IRequest): Promise<Balconist> {
    const adminRepository = getCustomRepository(AdminsRepository);

    const admin = await adminRepository.findOne(id);

    if (!admin) {
      throw new AppError('Admin not found!');
    }



    //const redisCache = new RedisCache();

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    admin.name = name;
    admin.registration_number = registration_number;
    admin.password = password;

    await adminRepository.save(admin);

    return admin;
  }
}

export default UpdateAdminService;
