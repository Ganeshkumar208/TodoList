import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Activity: string;

  @Column({default:'open'})
  Status: string;

  @Column({type :'date', nullable:true})
  DateToComplete: Date;

  @Column({type :'date', nullable:true})
  StartDate: Date;

  @Column({type :'time', nullable:true})
  StartTime: number;

  @Column({type :'date', nullable:true})
  CompletedDate: Date;

  @Column({type :'time', nullable:true})
  CompletedTime: number;

}


