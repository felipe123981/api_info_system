import  Balconist from '@modules/balconist/typeorm/entities/Balconist'
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  balconist: Balconist;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'balconist'],
    });
    return order;
  }
  public async createOrder({ balconist, products }: IRequest): Promise<Order> {
    const order = this.create({
      balconist,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
