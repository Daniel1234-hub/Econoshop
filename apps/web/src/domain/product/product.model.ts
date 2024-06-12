import { Supplier } from '../supplier'

import { TransactionProduct } from '../transactionProduct'

export class Product {
  id: string

  name: string

  category?: string

  quantity?: number

  price?: number

  supplierId?: string

  supplier?: Supplier

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  transactionProducts?: TransactionProduct[]
}
