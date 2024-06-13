import { getCustomRepository } from 'typeorm';
import { BalconistsRepository } from '../typeorm/repositories/BalconistsRepository';
import Balconist from '../typeorm/entities/Balconist';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowBalconistService {
  public async execute({ id }: IRequest): Promise<Balconist> {
    const balconistRepository = getCustomRepository(BalconistsRepository);

    const balconist = await balconistRepository.findOne(id);

    if (!balconist) {
      throw new AppError('Employee not found.');
    }

    return balconist;
  }
}

export default ShowBalconistService;
