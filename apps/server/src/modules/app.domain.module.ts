import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { SupplierDomainModule } from './supplier/domain'

import { ProductDomainModule } from './product/domain'

import { CustomerDomainModule } from './customer/domain'

import { EmployeeDomainModule } from './employee/domain'

import { TransactionDomainModule } from './transaction/domain'

import { TransactionProductDomainModule } from './transactionProduct/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    SupplierDomainModule,

    ProductDomainModule,

    CustomerDomainModule,

    EmployeeDomainModule,

    TransactionDomainModule,

    TransactionProductDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
