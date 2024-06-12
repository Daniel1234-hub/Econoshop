import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TransactionProductDomainFacade } from './transactionProduct.domain.facade'
import { TransactionProduct } from './transactionProduct.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionProduct]),
    DatabaseHelperModule,
  ],
  providers: [TransactionProductDomainFacade, TransactionProductDomainFacade],
  exports: [TransactionProductDomainFacade],
})
export class TransactionProductDomainModule {}
