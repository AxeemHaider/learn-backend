import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;
  @Column()
  created_by: number;
  @Column()
  amount: string;
  @Column()
  cruncy_code: string;
}

export default Product;
