import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Supplier as SupplierModel } from './supplier/supplier.model'

import { Product as ProductModel } from './product/product.model'

import { Customer as CustomerModel } from './customer/customer.model'

import { Employee as EmployeeModel } from './employee/employee.model'

import { Transaction as TransactionModel } from './transaction/transaction.model'

import { TransactionProduct as TransactionProductModel } from './transactionProduct/transactionProduct.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Supplier extends SupplierModel {}

  export class Product extends ProductModel {}

  export class Customer extends CustomerModel {}

  export class Employee extends EmployeeModel {}

  export class Transaction extends TransactionModel {}

  export class TransactionProduct extends TransactionProductModel {}
}
