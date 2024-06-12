export namespace SupplierApplicationEvent {
  export namespace SupplierCreated {
    export const key = 'supplier.application.supplier.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
