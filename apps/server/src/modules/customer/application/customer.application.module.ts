import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CustomerDomainModule } from '../domain'
import { CustomerController } from './customer.controller'

@Module({
  imports: [AuthenticationDomainModule, CustomerDomainModule],
  controllers: [CustomerController],
  providers: [],
})
export class CustomerApplicationModule {}
