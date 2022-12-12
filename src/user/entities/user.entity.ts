import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_admin: boolean;
}
