import Joi from 'joi'
import { Context } from 'koa'
import Router from 'koa-router'
import * as core from './core'
import { validateSchema } from './utils/validateSchema'

const router = new Router()

router.get('/api/v1/employee/:employeeId', async (ctx: Context) => {
  const { employeeId } = ctx.params

  const schema = Joi.object().keys({
    employeeId: Joi.string().required()
  })

  const errors = validateSchema(schema, { employeeId })

  if (errors) {
    ctx.fail('GET_EMPLOYEE_INVALID_SCHEMA', errors)
    return
  }

  try {
    const employee = await core.getEmployeeById({ employeeId })
    ctx.success(employee)
  } catch (err) {
    if (err.statusCode < 500) {
      ctx.fail(err.errorCode, err.message, err.statusCode)
      return
    }

    ctx.error('GET_EMPLOYEE_INTERNAL_ERROR', 'Internal server error')
  }
})

router.post('/api/v1/employee', async (ctx: Context) => {
  const { name, age, role } = ctx.request.body

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required()
  })

  const errors = validateSchema(schema, { name, age, role })

  if (errors) {
    ctx.fail('CREATE_EMPLOYEE_INVALID_SCHEMA', errors)
    return
  }

  try {
    const employee = await core.createEmployee({ name, age, role })
    ctx.success(employee)
  } catch (err) {
    if (err.statusCode < 500) {
      ctx.fail(err.errorCode, err.message, err.statusCode)
      return
    }

    ctx.error('CREATE_EMPLOYEE_INTERNAL_ERROR', 'Internal server error')
  }
})

router.put('/api/v1/employee/:employeeId', async (ctx: Context) => {
  const { employeeId } = ctx.params
  const {name, age, role} = ctx.request.body

  const schema = Joi.object().keys({
    employeeId: Joi.string().required(),
    name: Joi.string(),
    age: Joi.number(),
    role: Joi.string()
  })

  const errors = validateSchema(schema, { employeeId, name, age, role })

  if (errors) {
    ctx.fail('UPDATE_EMPLOYEE_INVALID_SCHEMA', errors)
    return
  }

  try {
    const employee = await core.updateEmployeeById({
      employeeId,
      data: {
        name,
        age,
        role
      }
    })
    ctx.success(employee)
  } catch (err) {
    if (err.statusCode < 500) {
      ctx.fail(err.errorCode, err.message, err.statusCode)
      return
    }

    ctx.error('UPDATE_EMPLOYEE_INTERNAL_ERROR', 'Internal server error')
  }
})

router.delete('/api/v1/employee/:employeeId', async (ctx: Context) => {
  const { employeeId } = ctx.params

  const schema = Joi.object().keys({
    employeeId: Joi.string().required()
  })

  const errors = validateSchema(schema, { employeeId })

  if (errors) {
    ctx.fail('DELETE_EMPLOYEE_INVALID_SCHEMA', errors)
    return
  }

  try {
    await core.deleteEmployeeById({ employeeId })
    ctx.success()
  } catch (err) {
    if (err.statusCode < 500) {
      ctx.fail(err.errorCode, err.message, err.statusCode)
      return
    }

    ctx.error('DELETE_EMPLOYEE_INTERNAL_ERROR', 'Internal server error')
  }
})

export default router
