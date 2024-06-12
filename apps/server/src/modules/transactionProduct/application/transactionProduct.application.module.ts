import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TransactionProductDomainModule } from '../domain'
import { TransactionProductController } from './transactionProduct.controller'

import { TransactionDomainModule } from '../../../modules/transaction/domain'

import { TransactionProductByTransactionController } from './transactionProductByTransaction.controller'

import { ProductDomainModule } from '../../../modules/product/domain'

import { TransactionProductByProductController } from './transactionProductByProduct.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TransactionProductDomainModule,

    TransactionDomainModule,

    ProductDomainModule,
  ],
  controllers: [
    TransactionProductController,

    TransactionProductByTransactionController,

    TransactionProductByProductController,
  ],
  providers: [],
})
export class TransactionProductApplicationModule {}
