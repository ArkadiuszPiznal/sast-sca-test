import Knex from 'knex';

// Connection configuration is sourced from environment variables only.
// Never hardcode credentials in source (ISO 27001 / secret-management).
export const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? 'test_backend',
  },
});
