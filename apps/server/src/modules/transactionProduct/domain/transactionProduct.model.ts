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

import { Transaction } from '../../../modules/transaction/domain'

import { Product } from '../../../modules/product/domain'

@Entity()
export class TransactionProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  quantity?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({ nullable: true })
  transactionId?: string

  @ManyToOne(() => Transaction, parent => parent.transactionProducts)
  @JoinColumn({ name: 'transactionId' })
  transaction?: Transaction

  @Column({ nullable: true })
  productId?: string

  @ManyToOne(() => Product, parent => parent.transactionProducts)
  @JoinColumn({ name: 'productId' })
  product?: Product

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
