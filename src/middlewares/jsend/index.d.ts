import { Middleware } from 'koa'

declare module 'koa' {
  interface BaseContext {
    success (data?: any): void
    fail (failCode: string, data: any, statusCode?: number): void
    error (code: string, message: string, data?: any, statusCode?: number): void
  }
}

declare function jsend (): Middleware

export = jsend
