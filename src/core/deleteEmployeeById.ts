import * as db from '../service/database'
import { IEmployee } from '../utils/types'

export const deleteEmployeeById = async (params: { employeeId: string }): Promise<IEmployee> => {
  const { employeeId } = params

  return db.deleteEmployeeById({ employeeId })
}