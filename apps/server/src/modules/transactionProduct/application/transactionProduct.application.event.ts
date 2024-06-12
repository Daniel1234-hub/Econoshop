export namespace TransactionProductApplicationEvent {
  export namespace TransactionProductCreated {
    export const key =
      'transactionProduct.application.transactionProduct.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
