import R from 'ramda'
import { Db, MongoClient, ObjectId } from 'mongodb'
import { createDbToPlainMapper } from '../utils/mapper'
import { IBaseEmployee, IEmployee } from '../utils/types'

let database: Db
let mongoClient: MongoClient

enum Collections {
  EMPLOYEE = 'Employee'
}

const isDatabaseConnected = () => {
  return !!mongoClient && !!database && mongoClient.isConnected()
}

export const getDb = async (): Promise<Db> => {
  if (database) {
    return database
  }

  const { MONGO_URL } = process.env
  if (!MONGO_URL) {
    throw new Error('No MONGO_URL defined')
  }
  if (database && isDatabaseConnected()) {
    return database
  }

  mongoClient = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  database = mongoClient.db()

  return database
}

export const safelyCloseConnectionIfOpen = async () => {
  if (mongoClient) {
    try {
      await mongoClient.close()
      database = null as any
    } catch (err) {
      throw new Error('CLOSE_CONNECTION_ERROR: Could not close connection with MONGO_DB')
    }
  }
}

const toPlainEmployee = createDbToPlainMapper<IEmployee>(['_id'])
const mapToPlainEmployee = createDbToPlainMapper<IEmployee>(['_id'])

export const createEmployee = async (params: IBaseEmployee): Promise<IEmployee> => {
  const db = await getDb()
  const now = new Date()

  const insertion = await db.collection(Collections.EMPLOYEE).insertOne({
    ...params,
    createdAt: now,
    updatedAt: now,
    deletedAt: null
  })

  return toPlainEmployee(insertion.ops[0])
}

export const updateEmployeeById = async (params: { employeeId: string, data: Partial<IBaseEmployee> }): Promise<IEmployee> => {
  const { employeeId, data } = params
  const db = await getDb()
  const newData = R.reject(R.isNil, data)

  const updateResult = await db.collection(Collections.EMPLOYEE).findOneAndUpdate(
    { _id: new ObjectId(employeeId) },
    {
      $set: {
        ...newData
      },
      $currentDate: {
        updatedAt: true
      }
    },
    { returnOriginal: false }
  )

  if (!updateResult.value) {
    throw new Error(`Could not find employee ${employeeId}, verify if employee exist.`)
  }

  return mapToPlainEmployee(updateResult.value)
}

export const getEmployeeById = async (params: { employeeId: string}): Promise<IEmployee> => {
  const { employeeId } = params
  const db = await getDb()

  const result = await db.collection(Collections.EMPLOYEE).findOne({
    _id: new ObjectId(employeeId),
    deletedAt: null
  })

  return mapToPlainEmployee(result)
}

export const deleteEmployeeById = async (params: { employeeId: string }): Promise<IEmployee> => {
  const { employeeId } = params
  const db = await getDb()

  const updateResult = await db.collection(Collections.EMPLOYEE).findOneAndUpdate(
    { _id: new ObjectId(employeeId) },
    {
      $currentDate: {
        updatedAt: true,
        deletedAt: true
      }
    },
    { returnOriginal: false }
  )

  if (!updateResult.value) {
    throw new Error(`Could not find employee ${employeeId}, verify if employee exist.`)
  }

  return mapToPlainEmployee(updateResult.value)
}