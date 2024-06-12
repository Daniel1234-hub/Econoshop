import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Transaction } from '../../../modules/transaction/domain'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  email: string

  @Column({ nullable: true })
  role?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.employees)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Transaction, child => child.employee)
  transactions?: Transaction[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
