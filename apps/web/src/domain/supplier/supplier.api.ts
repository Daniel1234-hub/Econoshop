import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Supplier } from './supplier.model'

export class SupplierApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Supplier>,
  ): Promise<Supplier[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/suppliers${buildOptions}`)
  }

  static findOne(
    supplierId: string,
    queryOptions?: ApiHelper.QueryOptions<Supplier>,
  ): Promise<Supplier> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/suppliers/${supplierId}${buildOptions}`)
  }

  static createOne(values: Partial<Supplier>): Promise<Supplier> {
    return HttpService.api.post(`/v1/suppliers`, values)
  }

  static updateOne(
    supplierId: string,
    values: Partial<Supplier>,
  ): Promise<Supplier> {
    return HttpService.api.patch(`/v1/suppliers/${supplierId}`, values)
  }

  static deleteOne(supplierId: string): Promise<void> {
    return HttpService.api.delete(`/v1/suppliers/${supplierId}`)
  }
}
