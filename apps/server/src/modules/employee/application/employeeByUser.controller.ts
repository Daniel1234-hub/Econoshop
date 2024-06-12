import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { EmployeeDomainFacade } from '@server/modules/employee/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { EmployeeApplicationEvent } from './employee.application.event'
import { EmployeeCreateDto } from './employee.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class EmployeeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private employeeDomainFacade: EmployeeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/employees')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.employeeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/employees')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: EmployeeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.employeeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<EmployeeApplicationEvent.EmployeeCreated.Payload>(
      EmployeeApplicationEvent.EmployeeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
