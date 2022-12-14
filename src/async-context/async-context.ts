import { AsyncLocalStorage } from 'async_hooks'
import { Inject } from '@nestjs/common'

export interface RequestContext {
  userId: string
}

export class AsyncContext {
  constructor(@Inject('ASYNC_LOCAL_STORAGE') private readonly asyncLocalStorage: AsyncLocalStorage<RequestContext>) {}

  private getStore(): RequestContext {
    const store = this.asyncLocalStorage.getStore()

    if (store === undefined) {
      throw new Error(
        'AsyncContext was not registered, call .register() or .registerCallback() before calling this method!',
      )
    }

    return store
  }

  get<K extends keyof RequestContext>(key: K): RequestContext[K] {
    return this.getStore()[key]
  }

  registerCallback<R, TArgs extends any[]>(
    initialState: RequestContext,
    callback: (...args: TArgs) => R,
    ...args: TArgs
  ): R {
    return this.asyncLocalStorage.run<R, TArgs>(initialState, callback, ...args)
  }

  unregister(): void {
    this.asyncLocalStorage.disable()
  }
}
