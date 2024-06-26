import Balconist from '@modules/balconist/typeorm/entities/Balconist';
import OrdersProducts from '@modules/orders/typeorm/entities/OrderProducts';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  price: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Balconist)
  @JoinColumn({ name: 'balconist_id' })
  @Column('string')
  balconist_id: Balconist;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
