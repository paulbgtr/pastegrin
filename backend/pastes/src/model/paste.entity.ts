import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pastes')
export class Paste {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId?: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  password?: string;
}
