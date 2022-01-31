import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/service/users.service';
import { IUserCreate, CreateUserDto } from 'src/interfaces/interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('users/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('users')
  async createUser(@Body(ValidationPipe) user: CreateUserDto): Promise<any> {
    console.log(user);
    let newUser: IUserCreate = {
      name: user.name,
      surname: user.surname,
      wish: user.wish.join(','),
      santa: 0,
    };
    return this.userService.createUser(newUser);
  }

  @Delete('users/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Post('shuffle')
  async getProfile(): Promise<User[]> {
    return this.userService.setSanta();
  }
}
