import { Employee } from '../employee'

import { Customer } from '../customer'

import { TransactionProduct } from '../transactionProduct'

export class Transaction {
  id: string

  totalPrice?: number

  transactionDate?: string

  employeeId?: string

  employee?: Employee

  customerId?: string

  customer?: Customer

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  transactionProducts?: TransactionProduct[]
}
