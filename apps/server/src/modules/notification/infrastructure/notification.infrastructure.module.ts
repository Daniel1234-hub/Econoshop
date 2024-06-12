import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationSupplierSubscriber } from './subscribers/notification.supplier.subscriber'

import { NotificationProductSubscriber } from './subscribers/notification.product.subscriber'

import { NotificationCustomerSubscriber } from './subscribers/notification.customer.subscriber'

import { NotificationEmployeeSubscriber } from './subscribers/notification.employee.subscriber'

import { NotificationTransactionSubscriber } from './subscribers/notification.transaction.subscriber'

import { NotificationTransactionProductSubscriber } from './subscribers/notification.transactionProduct.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationSupplierSubscriber,

    NotificationProductSubscriber,

    NotificationCustomerSubscriber,

    NotificationEmployeeSubscriber,

    NotificationTransactionSubscriber,

    NotificationTransactionProductSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
