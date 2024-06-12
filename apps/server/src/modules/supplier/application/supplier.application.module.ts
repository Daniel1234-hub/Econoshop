import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SupplierDomainModule } from '../domain'
import { SupplierController } from './supplier.controller'

@Module({
  imports: [AuthenticationDomainModule, SupplierDomainModule],
  controllers: [SupplierController],
  providers: [],
})
export class SupplierApplicationModule {}
