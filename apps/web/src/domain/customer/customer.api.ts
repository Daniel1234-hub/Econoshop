import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Customer } from './customer.model'

export class CustomerApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Customer>,
  ): Promise<Customer[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/customers${buildOptions}`)
  }

  static findOne(
    customerId: string,
    queryOptions?: ApiHelper.QueryOptions<Customer>,
  ): Promise<Customer> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/customers/${customerId}${buildOptions}`)
  }

  static createOne(values: Partial<Customer>): Promise<Customer> {
    return HttpService.api.post(`/v1/customers`, values)
  }

  static updateOne(
    customerId: string,
    values: Partial<Customer>,
  ): Promise<Customer> {
    return HttpService.api.patch(`/v1/customers/${customerId}`, values)
  }

  static deleteOne(customerId: string): Promise<void> {
    return HttpService.api.delete(`/v1/customers/${customerId}`)
  }
}
