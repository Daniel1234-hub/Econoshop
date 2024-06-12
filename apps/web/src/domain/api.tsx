import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { SupplierApi } from './supplier/supplier.api'

import { ProductApi } from './product/product.api'

import { CustomerApi } from './customer/customer.api'

import { EmployeeApi } from './employee/employee.api'

import { TransactionApi } from './transaction/transaction.api'

import { TransactionProductApi } from './transactionProduct/transactionProduct.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Supplier extends SupplierApi {}

  export class Product extends ProductApi {}

  export class Customer extends CustomerApi {}

  export class Employee extends EmployeeApi {}

  export class Transaction extends TransactionApi {}

  export class TransactionProduct extends TransactionProductApi {}
}
