import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';

const DATABASE_PASSWORD = 'Y4EZ6!4z&VSyi5X9C';
const awsKey =
  'b5d0g7i4l1r8s0t3v7w9x2y5z8a1b3c6d9e2f5g8h0j3k6l9m2n5p8r0s3t6v9w2y5z8a1b3c6d9AZDOVABC';

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
    console.log(DATABASE_PASSWORD);
    console.log(awsKey);
    return this.users.find((user) => user.id === id);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
