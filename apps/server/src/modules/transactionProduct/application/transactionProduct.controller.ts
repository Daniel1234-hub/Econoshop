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
import {
  TransactionProduct,
  TransactionProductDomainFacade,
} from '@server/modules/transactionProduct/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TransactionProductApplicationEvent } from './transactionProduct.application.event'
import {
  TransactionProductCreateDto,
  TransactionProductUpdateDto,
} from './transactionProduct.dto'

@Controller('/v1/transactionProducts')
export class TransactionProductController {
  constructor(
    private eventService: EventService,
    private transactionProductDomainFacade: TransactionProductDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.transactionProductDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: TransactionProductCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.transactionProductDomainFacade.create(body)

    await this.eventService.emit<TransactionProductApplicationEvent.TransactionProductCreated.Payload>(
      TransactionProductApplicationEvent.TransactionProductCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:transactionProductId')
  async findOne(
    @Param('transactionProductId') transactionProductId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.transactionProductDomainFacade.findOneByIdOrFail(
      transactionProductId,
      queryOptions,
    )

    return item
  }

  @Patch('/:transactionProductId')
  async update(
    @Param('transactionProductId') transactionProductId: string,
    @Body() body: TransactionProductUpdateDto,
  ) {
    const item =
      await this.transactionProductDomainFacade.findOneByIdOrFail(
        transactionProductId,
      )

    const itemUpdated = await this.transactionProductDomainFacade.update(
      item,
      body as Partial<TransactionProduct>,
    )
    return itemUpdated
  }

  @Delete('/:transactionProductId')
  async delete(@Param('transactionProductId') transactionProductId: string) {
    const item =
      await this.transactionProductDomainFacade.findOneByIdOrFail(
        transactionProductId,
      )

    await this.transactionProductDomainFacade.delete(item)

    return item
  }
}
