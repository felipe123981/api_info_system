import { getCustomRepository } from 'typeorm';
import { AdminsRepository } from '../typeorm/repositories/AdminsRepository';
import AppError from '@shared/errors/AppError';
//import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteAdminService {
  public async execute({ id }: IRequest): Promise<void> {
    const adminRepository = getCustomRepository(AdminsRepository);

    const admin = await adminRepository.findOne(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }
    //const redisCache = new RedisCache();

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await adminRepository.remove(admin);
  }
}

export default DeleteAdminService;
