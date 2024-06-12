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

import { Supplier } from '../../../modules/supplier/domain'

import { TransactionProduct } from '../../../modules/transactionProduct/domain'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  category?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  quantity?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({ nullable: true })
  supplierId?: string

  @ManyToOne(() => Supplier, parent => parent.products)
  @JoinColumn({ name: 'supplierId' })
  supplier?: Supplier

  @OneToMany(() => TransactionProduct, child => child.product)
  transactionProducts?: TransactionProduct[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
