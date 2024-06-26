import { getCustomRepository } from 'typeorm';
import { AdminsRepository } from '../typeorm/repositories/AdminsRepository';
//import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository'; // Importe corretamente o repositório de clientes
import AppError from '@shared/errors/AppError';
import Admin from '../typeorm/entities/Admin';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
//import RedisCache from '@shared/cache/RedisCache';
//import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  registration_number: number;
  password: string;
}
interface IResponse {
  admin: Admin;
  token: string;
}

class CreateSessionService {
  public async execute({
    registration_number,
    password,
  }: IRequest): Promise<IResponse> {
    const adminsRepository = getCustomRepository(AdminsRepository);

    const admin = await adminsRepository.findByNumber(registration_number);
    if (!admin) {
      throw new AppError('Incorrect user/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, admin.password);
    //const redisCache = new RedisCache();
    if (!passwordConfirmed) {
      throw new AppError('Incorrect user/password combination.', 401);
    }
    const token = sign(
      {},
      authConfig.jwt.adm_secret,
      {
        subject: admin.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return { admin, token };
  }
}

export default CreateSessionService;
