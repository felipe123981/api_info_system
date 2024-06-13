import { EntityRepository, Repository } from 'typeorm';
import Admin from '../entities/Admin';

@EntityRepository(Admin)
export class AdminsRepository extends Repository<Admin> {
  public async findById(id: string): Promise<Admin | undefined> {
    const admin = this.findOne({
      where: {
        id,
      },
    });
    return admin;
  }
  public async findByName(name: string): Promise<Admin | undefined> {
    const admin = this.findOne({
      where: {
        name,
      },
    });
    return admin;
  }
  public async findByNumber(registration_number: number): Promise<Admin | undefined> {
    const admin = this.findOne({
      where: {
        registration_number,
      },
    });
    return admin;
  }
}
