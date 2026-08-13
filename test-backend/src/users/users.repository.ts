import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];

  create(data: Omit<User, 'id' | 'createdAt'>): User {
    const user: User = {
      id: randomUUID(),
      createdAt: new Date(),
      ...data,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
