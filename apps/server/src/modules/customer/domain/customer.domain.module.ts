import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CustomerDomainFacade } from './customer.domain.facade'
import { Customer } from './customer.model'

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), DatabaseHelperModule],
  providers: [CustomerDomainFacade, CustomerDomainFacade],
  exports: [CustomerDomainFacade],
})
export class CustomerDomainModule {}
