import * as db from '../service/database'
import { IEmployee } from '../utils/types'

export const getEmployeeById = async (params: { employeeId: string }): Promise<IEmployee> => {
  const { employeeId } = params

  return db.getEmployeeById({ employeeId })
}