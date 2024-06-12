import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TransactionProductDomainFacade } from '@server/modules/transactionProduct/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TransactionProductApplicationEvent } from './transactionProduct.application.event'
import { TransactionProductCreateDto } from './transactionProduct.dto'

import { ProductDomainFacade } from '../../product/domain'

@Controller('/v1/products')
export class TransactionProductByProductController {
  constructor(
    private productDomainFacade: ProductDomainFacade,

    private transactionProductDomainFacade: TransactionProductDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/product/:productId/transactionProducts')
  async findManyProductId(
    @Param('productId') productId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.productDomainFacade.findOneByIdOrFail(productId)

    const items = await this.transactionProductDomainFacade.findManyByProduct(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/product/:productId/transactionProducts')
  async createByProductId(
    @Param('productId') productId: string,
    @Body() body: TransactionProductCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, productId }

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
