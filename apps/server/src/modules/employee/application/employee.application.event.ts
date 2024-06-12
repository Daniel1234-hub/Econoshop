export namespace EmployeeApplicationEvent {
  export namespace EmployeeCreated {
    export const key = 'employee.application.employee.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
