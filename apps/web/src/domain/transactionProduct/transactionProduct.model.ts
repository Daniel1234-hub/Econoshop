import { Transaction } from '../transaction'

import { Product } from '../product'

export class TransactionProduct {
  id: string

  quantity?: number

  price?: number

  transactionId?: string

  transaction?: Transaction

  productId?: string

  product?: Product

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
