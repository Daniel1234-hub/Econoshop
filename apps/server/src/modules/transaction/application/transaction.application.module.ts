import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TransactionDomainModule } from '../domain'
import { TransactionController } from './transaction.controller'

import { EmployeeDomainModule } from '../../../modules/employee/domain'

import { TransactionByEmployeeController } from './transactionByEmployee.controller'

import { CustomerDomainModule } from '../../../modules/customer/domain'

import { TransactionByCustomerController } from './transactionByCustomer.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TransactionDomainModule,

    EmployeeDomainModule,

    CustomerDomainModule,
  ],
  controllers: [
    TransactionController,

    TransactionByEmployeeController,

    TransactionByCustomerController,
  ],
  providers: [],
})
export class TransactionApplicationModule {}
