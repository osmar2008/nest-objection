import { AsyncLocalStorage } from 'async_hooks'
import { Global, Module } from '@nestjs/common'
import type { RequestContext } from './async-context'
import { AsyncContext } from './async-context'

@Global()
@Module({
  providers: [
    AsyncContext,
    {
      provide: 'ASYNC_LOCAL_STORAGE',
      useValue: new AsyncLocalStorage<RequestContext>(),
    },
  ],
  exports: [AsyncContext],
})
export class AsyncContextModule {}
