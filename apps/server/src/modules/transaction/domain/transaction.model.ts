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

import { Employee } from '../../../modules/employee/domain'

import { Customer } from '../../../modules/customer/domain'

import { TransactionProduct } from '../../../modules/transactionProduct/domain'

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  totalPrice?: number

  @Column({ nullable: true })
  transactionDate?: string

  @Column({ nullable: true })
  employeeId?: string

  @ManyToOne(() => Employee, parent => parent.transactions)
  @JoinColumn({ name: 'employeeId' })
  employee?: Employee

  @Column({ nullable: true })
  customerId?: string

  @ManyToOne(() => Customer, parent => parent.transactions)
  @JoinColumn({ name: 'customerId' })
  customer?: Customer

  @OneToMany(() => TransactionProduct, child => child.transaction)
  transactionProducts?: TransactionProduct[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
