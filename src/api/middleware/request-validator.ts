import { body } from 'express-validator'
import { RequestBodyType } from '~/type'
import { requestValidationRules } from './response-validator'

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
