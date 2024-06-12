import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EmployeeDomainFacade } from './employee.domain.facade'
import { Employee } from './employee.model'

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), DatabaseHelperModule],
  providers: [EmployeeDomainFacade, EmployeeDomainFacade],
  exports: [EmployeeDomainFacade],
})
export class EmployeeDomainModule {}
