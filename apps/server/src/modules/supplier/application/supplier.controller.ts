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
import { Supplier, SupplierDomainFacade } from '@server/modules/supplier/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SupplierApplicationEvent } from './supplier.application.event'
import { SupplierCreateDto, SupplierUpdateDto } from './supplier.dto'

@Controller('/v1/suppliers')
export class SupplierController {
  constructor(
    private eventService: EventService,
    private supplierDomainFacade: SupplierDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.supplierDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SupplierCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.supplierDomainFacade.create(body)

    await this.eventService.emit<SupplierApplicationEvent.SupplierCreated.Payload>(
      SupplierApplicationEvent.SupplierCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:supplierId')
  async findOne(
    @Param('supplierId') supplierId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.supplierDomainFacade.findOneByIdOrFail(
      supplierId,
      queryOptions,
    )

    return item
  }

  @Patch('/:supplierId')
  async update(
    @Param('supplierId') supplierId: string,
    @Body() body: SupplierUpdateDto,
  ) {
    const item = await this.supplierDomainFacade.findOneByIdOrFail(supplierId)

    const itemUpdated = await this.supplierDomainFacade.update(
      item,
      body as Partial<Supplier>,
    )
    return itemUpdated
  }

  @Delete('/:supplierId')
  async delete(@Param('supplierId') supplierId: string) {
    const item = await this.supplierDomainFacade.findOneByIdOrFail(supplierId)

    await this.supplierDomainFacade.delete(item)

    return item
  }
}
