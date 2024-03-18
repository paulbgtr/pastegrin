import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pastes')
export class Paste {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'is_protected', default: false })
  isProtected: boolean;

  @Column()
  password: string;
}
