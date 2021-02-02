// TODO: Make this its own package. Inline R.mergeAll to remove dependency
import * as R from 'ramda'
import Joi, { Schema } from 'joi'

export const validateSchema = (schema: Schema, validationTarget: object) => {
  const { error } = Joi.validate(validationTarget, schema, { abortEarly: false, convert: false })

  if (!error || !error.details) {
    return undefined
  }

  // transform { message: 'foo', path: ['a', 'b'] } => { 'a.b': 'foo' }
  const errorsArray = error.details.map(({ message, path }) => ({ [path.join('.')]: message }))
  const errors = R.mergeAll(errorsArray)

  return errors
}
