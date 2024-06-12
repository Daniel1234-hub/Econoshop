import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EmployeeDomainModule } from '../domain'
import { EmployeeController } from './employee.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { EmployeeByUserController } from './employeeByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, EmployeeDomainModule, UserDomainModule],
  controllers: [EmployeeController, EmployeeByUserController],
  providers: [],
})
export class EmployeeApplicationModule {}
