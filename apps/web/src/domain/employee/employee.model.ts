import { User } from '../user'

import { Transaction } from '../transaction'

export class Employee {
  id: string

  name: string

  email: string

  role?: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  transactions?: Transaction[]
}
