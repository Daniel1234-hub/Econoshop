import { Transaction } from '../transaction'

export class Customer {
  id: string

  name: string

  contactInformation?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  transactions?: Transaction[]
}
