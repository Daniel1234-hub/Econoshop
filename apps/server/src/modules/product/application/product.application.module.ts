import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProductDomainModule } from '../domain'
import { ProductController } from './product.controller'

import { SupplierDomainModule } from '../../../modules/supplier/domain'

import { ProductBySupplierController } from './productBySupplier.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ProductDomainModule,

    SupplierDomainModule,
  ],
  controllers: [ProductController, ProductBySupplierController],
  providers: [],
})
export class ProductApplicationModule {}
