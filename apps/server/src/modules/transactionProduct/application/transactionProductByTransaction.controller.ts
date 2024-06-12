import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TransactionProductDomainFacade } from '@server/modules/transactionProduct/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TransactionProductApplicationEvent } from './transactionProduct.application.event'
import { TransactionProductCreateDto } from './transactionProduct.dto'

import { TransactionDomainFacade } from '../../transaction/domain'

@Controller('/v1/transactions')
export class TransactionProductByTransactionController {
  constructor(
    private transactionDomainFacade: TransactionDomainFacade,

    private transactionProductDomainFacade: TransactionProductDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/transaction/:transactionId/transactionProducts')
  async findManyTransactionId(
    @Param('transactionId') transactionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.transactionDomainFacade.findOneByIdOrFail(transactionId)

    const items =
      await this.transactionProductDomainFacade.findManyByTransaction(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/transaction/:transactionId/transactionProducts')
  async createByTransactionId(
    @Param('transactionId') transactionId: string,
    @Body() body: TransactionProductCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, transactionId }

    const item = await this.transactionProductDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TransactionProductApplicationEvent.TransactionProductCreated.Payload>(
      TransactionProductApplicationEvent.TransactionProductCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
