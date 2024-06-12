import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Employee } from './employee.model'

export class EmployeeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Employee>,
  ): Promise<Employee[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/employees${buildOptions}`)
  }

  static findOne(
    employeeId: string,
    queryOptions?: ApiHelper.QueryOptions<Employee>,
  ): Promise<Employee> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/employees/${employeeId}${buildOptions}`)
  }

  static createOne(values: Partial<Employee>): Promise<Employee> {
    return HttpService.api.post(`/v1/employees`, values)
  }

  static updateOne(
    employeeId: string,
    values: Partial<Employee>,
  ): Promise<Employee> {
    return HttpService.api.patch(`/v1/employees/${employeeId}`, values)
  }

  static deleteOne(employeeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/employees/${employeeId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Employee>,
  ): Promise<Employee[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/employees${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Employee>,
  ): Promise<Employee> {
    return HttpService.api.post(`/v1/users/user/${userId}/employees`, values)
  }
}
