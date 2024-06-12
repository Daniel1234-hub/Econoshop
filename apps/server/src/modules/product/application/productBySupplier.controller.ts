import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProductDomainFacade } from '@server/modules/product/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProductApplicationEvent } from './product.application.event'
import { ProductCreateDto } from './product.dto'

import { SupplierDomainFacade } from '../../supplier/domain'

@Controller('/v1/suppliers')
export class ProductBySupplierController {
  constructor(
    private supplierDomainFacade: SupplierDomainFacade,

    private productDomainFacade: ProductDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/supplier/:supplierId/products')
  async findManySupplierId(
    @Param('supplierId') supplierId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.supplierDomainFacade.findOneByIdOrFail(supplierId)

    const items = await this.productDomainFacade.findManyBySupplier(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/supplier/:supplierId/products')
  async createBySupplierId(
    @Param('supplierId') supplierId: string,
    @Body() body: ProductCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, supplierId }

    const item = await this.productDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProductApplicationEvent.ProductCreated.Payload>(
      ProductApplicationEvent.ProductCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
