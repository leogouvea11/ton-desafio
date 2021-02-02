import * as db from '../service/database'
import { IBaseEmployee, IEmployee } from '../utils/types'

export const updateEmployeeById = async (params: { employeeId: string, data: Partial<IBaseEmployee> }): Promise<IEmployee> => {
  const { employeeId, data } = params

  return db.updateEmployeeById({ employeeId, data })
}