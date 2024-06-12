import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { SupplierApplicationModule } from './supplier/application'

import { ProductApplicationModule } from './product/application'

import { CustomerApplicationModule } from './customer/application'

import { EmployeeApplicationModule } from './employee/application'

import { TransactionApplicationModule } from './transaction/application'

import { TransactionProductApplicationModule } from './transactionProduct/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    SupplierApplicationModule,

    ProductApplicationModule,

    CustomerApplicationModule,

    EmployeeApplicationModule,

    TransactionApplicationModule,

    TransactionProductApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
