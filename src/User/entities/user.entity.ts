import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  login: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsInt()
  version: number;

  @Column('bigint')
  @IsInt()
  createdAt: number;

  @Column('bigint')
  @IsInt()
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    // const { id, login, version } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
