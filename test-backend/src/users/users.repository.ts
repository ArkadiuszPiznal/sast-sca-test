import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { knex } from '../database/knex';
import { User } from './entities/user.entity';

const TABLE = 'users';

interface UserRow {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

@Injectable()
export class UsersRepository {
  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const row: UserRow = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      password_hash: data.passwordHash,
      created_at: new Date(),
    };
    // Parameterized insert — safe.
    const [inserted] = await knex<UserRow>(TABLE).insert(row).returning('*');
    return toUser(inserted);
  }

  async findAll(): Promise<User[]> {
    const rows = await knex<UserRow>(TABLE).select('*');
    return rows.map(toUser);
  }

  async findOne(id: string): Promise<User | undefined> {
    // Parameterized lookup — safe.
    const row = await knex<UserRow>(TABLE).where({ id }).first();
    return row ? toUser(row) : undefined;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const result = await knex.raw(
      `SELECT * FROM ${TABLE} WHERE username = '${username}'`,
    );
    const row = result.rows?.[0] as UserRow | undefined;
    return row ? toUser(row) : undefined;
  }
}
