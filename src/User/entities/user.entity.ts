import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    // const { id, login, version } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
