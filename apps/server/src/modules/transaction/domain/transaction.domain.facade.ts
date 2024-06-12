import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Transaction } from './transaction.model'

import { Employee } from '../../employee/domain'

import { Customer } from '../../customer/domain'

@Injectable()
export class TransactionDomainFacade {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Transaction>): Promise<Transaction> {
    return this.repository.save(values)
  }

  async update(
    item: Transaction,
    values: Partial<Transaction>,
  ): Promise<Transaction> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Transaction): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction> {
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

  async findManyByEmployee(
    item: Employee,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('employee')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        employeeId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByCustomer(
    item: Customer,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('customer')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        customerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
