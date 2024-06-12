import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SupplierDomainFacade } from './supplier.domain.facade'
import { Supplier } from './supplier.model'

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), DatabaseHelperModule],
  providers: [SupplierDomainFacade, SupplierDomainFacade],
  exports: [SupplierDomainFacade],
})
export class SupplierDomainModule {}
