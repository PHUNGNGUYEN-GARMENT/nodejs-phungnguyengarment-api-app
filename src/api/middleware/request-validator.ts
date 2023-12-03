import { RequestBodyType } from '~/type'
import { requestValidationRules } from './response-validator'
import { body } from 'express-validator'

export const initializeRequestBody: RequestBodyType = {
  searchTerm: '',
  filter: {
    status: 'active',
    items: [-1]
  },
  paginator: {
    page: 1,
    pageSize: 5
  },
  sorting: {
    column: 'id',
    direction: 'desc'
  }
}

export const defaultRequestBodyValidator = () => {
  return requestValidationRules([
    body('filter')
      .exists()
      .withMessage('This field can not empty!')
      .isObject()
      .withMessage('This field must be object type!'),
    body('paginator')
      .exists()
      .withMessage('This field can not empty!')
      .isObject()
      .withMessage('This field must be object type!'),
    body('searchTerm')
      .exists()
      .withMessage('This field can not empty!')
      .isString()
      .withMessage('This field must be string type!'),
    body('sorting')
      .exists()
      .withMessage('This field can not empty!')
      .isObject()
      .withMessage('This field must be object type!')
  ])
}
