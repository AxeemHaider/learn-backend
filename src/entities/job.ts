import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Job {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;
}

export default Job;
