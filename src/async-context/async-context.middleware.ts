import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AsyncContext } from './async-context'
import { randomUUID } from 'crypto'
import { ClsServiceManager } from 'nestjs-cls'

@Injectable()
export class AsyncContextMiddleware implements NestMiddleware {
  constructor(private readonly asyncContext: AsyncContext) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const userId = randomUUID()

    console.log('userID: ', userId)
    const requestContext = Object.freeze({ userId })

    const cls = ClsServiceManager.getClsService()

    cls.set('userId', userId)

    this.asyncContext.registerCallback(requestContext, () => next())
  }
}
