import { getCustomRepository } from 'typeorm';
import { BalconistsRepository } from '../typeorm/repositories/BalconistsRepository';
import authConfig from '@config/auth';
//import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository'; // Importe corretamente o repositório de clientes
import AppError from '@shared/errors/AppError';
import Balconist from '../typeorm/entities/Balconist';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
//import RedisCache from '@shared/cache/RedisCache';
//import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  registration_number: number;
  password: string;
}

interface IResponse {
  balconist: Balconist;
  token: string;
}

class CreateSessionService {
  public async execute({
    registration_number,
    password,
  }: IRequest): Promise<IResponse> {
    const balconistsRepository = getCustomRepository(BalconistsRepository);

    const balconist =
      await balconistsRepository.findByNumber(registration_number);
    if (!balconist) {
      throw new AppError('Incorrect user/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, balconist.password);
    //const redisCache = new RedisCache();
    if (!passwordConfirmed) {
      throw new AppError('Incorrect user/password combination.', 401);
    }
    const token = sign({}, authConfig.jwt.employee_secret, {
      subject: balconist.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    //await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return {
      balconist,
      token,
    };
  }
}

export default CreateSessionService;
