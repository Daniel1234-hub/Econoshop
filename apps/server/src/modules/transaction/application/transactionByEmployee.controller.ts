import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TransactionDomainFacade } from '@server/modules/transaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TransactionApplicationEvent } from './transaction.application.event'
import { TransactionCreateDto } from './transaction.dto'

import { EmployeeDomainFacade } from '../../employee/domain'

@Controller('/v1/employees')
export class TransactionByEmployeeController {
  constructor(
    private employeeDomainFacade: EmployeeDomainFacade,

    private transactionDomainFacade: TransactionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/employee/:employeeId/transactions')
  async findManyEmployeeId(
    @Param('employeeId') employeeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.employeeDomainFacade.findOneByIdOrFail(employeeId)

    const items = await this.transactionDomainFacade.findManyByEmployee(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/employee/:employeeId/transactions')
  async createByEmployeeId(
    @Param('employeeId') employeeId: string,
    @Body() body: TransactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, employeeId }

    const item = await this.transactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TransactionApplicationEvent.TransactionCreated.Payload>(
      TransactionApplicationEvent.TransactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
