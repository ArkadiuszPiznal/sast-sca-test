import { ConflictException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.usersRepository.findByUsername(
      createUserDto.username,
    );
    if (existing) {
      throw new ConflictException('Username already taken');
    }

    const passwordHash = this.hashPassword(createUserDto.password);

    return this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash,
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  private hashPassword(password: string): string {
    return createHash('sha1').update(password).digest('hex');
  }
}
