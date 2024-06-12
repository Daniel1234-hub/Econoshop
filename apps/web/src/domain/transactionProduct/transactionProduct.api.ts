import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { TransactionProduct } from './transactionProduct.model'

export class TransactionProductApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<TransactionProduct>,
  ): Promise<TransactionProduct[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/transactionProducts${buildOptions}`)
  }

  static findOne(
    transactionProductId: string,
    queryOptions?: ApiHelper.QueryOptions<TransactionProduct>,
  ): Promise<TransactionProduct> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/transactionProducts/${transactionProductId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<TransactionProduct>,
  ): Promise<TransactionProduct> {
    return HttpService.api.post(`/v1/transactionProducts`, values)
  }

  static updateOne(
    transactionProductId: string,
    values: Partial<TransactionProduct>,
  ): Promise<TransactionProduct> {
    return HttpService.api.patch(
      `/v1/transactionProducts/${transactionProductId}`,
      values,
    )
  }

  static deleteOne(transactionProductId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/transactionProducts/${transactionProductId}`,
    )
  }

  static findManyByTransactionId(
    transactionId: string,
    queryOptions?: ApiHelper.QueryOptions<TransactionProduct>,
  ): Promise<TransactionProduct[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/transactions/transaction/${transactionId}/transactionProducts${buildOptions}`,
    )
  }

  static createOneByTransactionId(
    transactionId: string,
    values: Partial<TransactionProduct>,
  ): Promise<TransactionProduct> {
    return HttpService.api.post(
      `/v1/transactions/transaction/${transactionId}/transactionProducts`,
      values,
    )
  }

  static findManyByProductId(
    productId: string,
    queryOptions?: ApiHelper.QueryOptions<TransactionProduct>,
  ): Promise<TransactionProduct[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/products/product/${productId}/transactionProducts${buildOptions}`,
    )
  }

  static createOneByProductId(
    productId: string,
    values: Partial<TransactionProduct>,
  ): Promise<TransactionProduct> {
    return HttpService.api.post(
      `/v1/products/product/${productId}/transactionProducts`,
      values,
    )
  }
}
