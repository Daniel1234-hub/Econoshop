import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Employee, EmployeeDomainFacade } from '@server/modules/employee/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EmployeeApplicationEvent } from './employee.application.event'
import { EmployeeCreateDto, EmployeeUpdateDto } from './employee.dto'

@Controller('/v1/employees')
export class EmployeeController {
  constructor(
    private eventService: EventService,
    private employeeDomainFacade: EmployeeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.employeeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: EmployeeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.employeeDomainFacade.create(body)

    await this.eventService.emit<EmployeeApplicationEvent.EmployeeCreated.Payload>(
      EmployeeApplicationEvent.EmployeeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:employeeId')
  async findOne(
    @Param('employeeId') employeeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.employeeDomainFacade.findOneByIdOrFail(
      employeeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:employeeId')
  async update(
    @Param('employeeId') employeeId: string,
    @Body() body: EmployeeUpdateDto,
  ) {
    const item = await this.employeeDomainFacade.findOneByIdOrFail(employeeId)

    const itemUpdated = await this.employeeDomainFacade.update(
      item,
      body as Partial<Employee>,
    )
    return itemUpdated
  }

  @Delete('/:employeeId')
  async delete(@Param('employeeId') employeeId: string) {
    const item = await this.employeeDomainFacade.findOneByIdOrFail(employeeId)

    await this.employeeDomainFacade.delete(item)

    return item
  }
}
