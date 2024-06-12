import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { TransactionProduct } from './transactionProduct.model'

import { Transaction } from '../../transaction/domain'

import { Product } from '../../product/domain'

@Injectable()
export class TransactionProductDomainFacade {
  constructor(
    @InjectRepository(TransactionProduct)
    private repository: Repository<TransactionProduct>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<TransactionProduct>,
  ): Promise<TransactionProduct> {
    return this.repository.save(values)
  }

  async update(
    item: TransactionProduct,
    values: Partial<TransactionProduct>,
  ): Promise<TransactionProduct> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: TransactionProduct): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<TransactionProduct> = {},
  ): Promise<TransactionProduct[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<TransactionProduct> = {},
  ): Promise<TransactionProduct> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByTransaction(
    item: Transaction,
    queryOptions: RequestHelper.QueryOptions<TransactionProduct> = {},
  ): Promise<TransactionProduct[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('transaction')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        transactionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByProduct(
    item: Product,
    queryOptions: RequestHelper.QueryOptions<TransactionProduct> = {},
  ): Promise<TransactionProduct[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('product')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        productId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
