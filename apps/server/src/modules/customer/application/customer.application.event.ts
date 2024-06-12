export namespace CustomerApplicationEvent {
  export namespace CustomerCreated {
    export const key = 'customer.application.customer.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
