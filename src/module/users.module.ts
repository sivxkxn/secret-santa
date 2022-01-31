import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../entity/user.entity';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}