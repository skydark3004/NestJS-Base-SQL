import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('character')
export class Character extends BaseEntity {
  /*   @Column({ nullable: false, type: 'int' })
  coin: number;

  @Column({ nullable: false, type: 'text', unique: true })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string; */

  @Column({ nullable: true, type: 'text', default: 'https://random.imagecdn.app/500/150' })
  thumbnail: string;

  /*   @Column({ nullable: false, type: 'int', default: 0 })
  totalConversations: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean; */

  @Column({ type: 'boolean', default: false })
  test: boolean;
}
