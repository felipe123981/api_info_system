import { getCustomRepository } from 'typeorm';
import { AdminsRepository } from '../typeorm/repositories/AdminsRepository';
import Admin from '../typeorm/entities/Admin';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowAdminService {
  public async execute({ id }: IRequest): Promise<Admin> {
    const adminRepository = getCustomRepository(AdminsRepository);

    const admin = await adminRepository.findOne(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    return admin;
  }
}

export default ShowAdminService;
