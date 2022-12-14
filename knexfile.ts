import 'dotenv/config'
import { knexSnakeCaseMappers } from 'objection'

export default {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './src/db/migrations',
    stub: './src/db/migration.stub.ts',
  },
  seeds: {
    directory: './src/db/seeds',
    stub: './src/db/seed.stub.ts',
  },
  ...knexSnakeCaseMappers(),
}
