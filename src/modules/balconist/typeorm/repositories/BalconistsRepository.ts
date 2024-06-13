import { EntityRepository, Repository } from 'typeorm';
import Balconist from '../entities/Balconist';

@EntityRepository(Balconist)
export class BalconistsRepository extends Repository<Balconist> {
  public async findById(id: string): Promise<Balconist | undefined> {
    const balconist = this.findOne({
      where: {
        id,
      },
    });
    return balconist;
  }
  public async findByName(name: string): Promise<Balconist | undefined> {
    const balconist = this.findOne({
      where: {
        name,
      },
    });
    return balconist;
  }
  public async findByNumber(registration_number: number): Promise<Balconist | undefined> {
    const balconist = this.findOne({
      where: {
        registration_number,
      },
    });
    return balconist;
  }
}
