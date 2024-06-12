import { Product } from '../product'

export class Supplier {
  id: string

  name: string

  contactInformation?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  products?: Product[]
}
