/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import methods, { Method, MethodType } from './methods'

export interface ResponseStory {
  isSuccess?: boolean
  message?: string
  data?: any
  meta?: any
}

type ResponseFunction = {
  [key in MethodType]: (response: ResponseStory) => void
}

declare global {
  namespace Express {
    interface Response {
      formatter: ResponseFunction
    }
  }
}

export const responseEnhancer =
  () =>
  (_req: Request, res: Response, next: NextFunction): void => {
    res.formatter = _generateFormatters(res)
    next()
  }

const _generateFormatters = (res: Response) => {
  const formatter = {} as ResponseFunction

  methods.map((method: Method) => {
    formatter[method.type] = (response: ResponseStory) => {
      res.status(method.status).json({
        isSuccess: method.status < 400,
        message: response.message ? response.message : method.message,
        data: response.data,
        meta: response.meta
      })
    }
  })

  return formatter
}
