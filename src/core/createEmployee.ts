import * as db from '../service/database'
import { IBaseEmployee, IEmployee } from '../utils/types'

export const createEmployee = async (params: IBaseEmployee): Promise<IEmployee> => {
  const { age, name, role } = params

  return db.createEmployee({ age, role, name })
}