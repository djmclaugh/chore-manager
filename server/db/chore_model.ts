import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Chore } from '../../shared/entities/chore';

@Entity()
export default class ChoreModel extends BaseEntity implements Chore {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  name!: string;

  @Column('int')
  lastCompletedTimestamp: number = (new Date()).getTime();

  @Column('int')
  daysUntilLowPriority: number = -1;

  @Column('int')
  daysUntilMediumPriority: number = -1;

  @Column('int')
  daysUntilHighPriority: number = -1;

  static fetchAllChores(): Promise<ChoreModel[]> {
    return ChoreModel.find();
  }

  static fetchChoreById(id: number): Promise<ChoreModel|undefined> {
    return ChoreModel.findOne(id);
  }
}
