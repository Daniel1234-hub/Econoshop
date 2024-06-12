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
import { Customer, CustomerDomainFacade } from '@server/modules/customer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CustomerApplicationEvent } from './customer.application.event'
import { CustomerCreateDto, CustomerUpdateDto } from './customer.dto'

@Controller('/v1/customers')
export class CustomerController {
  constructor(
    private eventService: EventService,
    private customerDomainFacade: CustomerDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.customerDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CustomerCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.customerDomainFacade.create(body)

    await this.eventService.emit<CustomerApplicationEvent.CustomerCreated.Payload>(
      CustomerApplicationEvent.CustomerCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:customerId')
  async findOne(
    @Param('customerId') customerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.customerDomainFacade.findOneByIdOrFail(
      customerId,
      queryOptions,
    )

    return item
  }

  @Patch('/:customerId')
  async update(
    @Param('customerId') customerId: string,
    @Body() body: CustomerUpdateDto,
  ) {
    const item = await this.customerDomainFacade.findOneByIdOrFail(customerId)

    const itemUpdated = await this.customerDomainFacade.update(
      item,
      body as Partial<Customer>,
    )
    return itemUpdated
  }

  @Delete('/:customerId')
  async delete(@Param('customerId') customerId: string) {
    const item = await this.customerDomainFacade.findOneByIdOrFail(customerId)

    await this.customerDomainFacade.delete(item)

    return item
  }
}
