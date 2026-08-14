import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { knex } from '../database/knex';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('search')
  async search(@Query('username') username: string): Promise<User[]> {
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    const result = await knex.raw(query);
    return result.rows ?? [];
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }
}
