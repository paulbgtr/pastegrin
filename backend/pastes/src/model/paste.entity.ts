import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paste {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isProtected: boolean;

  @Column()
  password: string;
}
